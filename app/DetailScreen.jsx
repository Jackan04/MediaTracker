import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItemDetails } from "./api/tmdb";
import Button from "./components/Button/Button";
import Header from "./components/Header";
import MetaInfoRow from "./components/MetaInfoRow";
import { usePinnedStatus } from "./contexts/PinnedStatusContext";
import { useSavedStatus } from "./contexts/SavedStatusContext";
import { useWatchlist } from "./contexts/WatchListContext";
import { useWatchStatus } from "./contexts/WatchStatusContext";
import {
  deleteItem,
  getPinnedState,
  getWatchState,
  insertItem,
  isItemSaved,
  togglePinned,
  toggleWatched,
} from "./server/queries";
import globalStyles from "./utils/globalStyles";
import { COLORS, SIZES } from "./utils/theme";

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const [item, setItem] = useState(null);
  const router = useRouter();
  const { refreshWatchList } = useWatchlist();
  const { watchStatus, updateWatchStatus } = useWatchStatus();
  const { savedStatus, updateSavedStatus } = useSavedStatus();
  const { pinnedStatus, updatePinnedStatus } = usePinnedStatus();

  useEffect(() => {
    const displayDetails = async () => {
      try {
        const result = await getItemDetails(params.tmdb_id, params.media_type);
        setItem(result);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    if (params.tmdb_id && params.media_type) {
      displayDetails();
    }
  }, [params.tmdb_id, params.media_type]);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (item && item.tmdb_id) {
        try {
          const status = await isItemSaved(item.tmdb_id);
          updateSavedStatus(item.tmdb_id, Boolean(status));
        } catch (error) {
          console.error("Error checking if item is saved:", error);
        }
      }
    };

    const checkIfWatched = async () => {
      if (item && item.tmdb_id) {
        try {
          const status = await getWatchState(item.tmdb_id);
          updateWatchStatus(item.tmdb_id, Boolean(status));
        } catch (error) {
          console.error("Error checking if item is watched:", error);
        }
      }
    };

    const checkIfPinned = async () => {
      if (item && item.tmdb_id) {
        try {
          const status = await getPinnedState(item.tmdb_id);
          updatePinnedStatus(item.tmdb_id, Boolean(status));
        } catch (error) {
          console.error("Error checking if item is pinned:", error);
        }
      }
    };
    checkIfSaved();
    checkIfWatched();
    checkIfPinned();
  }, [item]);

  const handleDelete = async () => {
    if (watchStatus[item.tmdb_id]) {
      alert("Please mark the item as unwatched before deleting it.");
      return;
    }
    Alert.alert(
      "Remove from Library",
      "Are you sure you want to remove this item from your library?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteItem(item.tmdb_id);
              updateSavedStatus(item.tmdb_id, false);
              refreshWatchList();
            } catch (error) {
              console.error("Error deleting item:", error);
            }
          },
        },
      ]
    );
  };
  const handleSave = async () => {
    try {
      await insertItem(item);
      updateSavedStatus(item.tmdb_id, true);
      refreshWatchList();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleToggledWatched = async () => {
    try {
      if (savedStatus[item.tmdb_id] === false) {
        handleSave(item); // Save item if it isn't already saved
      }

      const newStatus = await toggleWatched(
        item.tmdb_id,
        watchStatus[item.tmdb_id]
      );
      updateWatchStatus(item.tmdb_id, Boolean(newStatus));
      refreshWatchList();
    } catch (error) {
      console.error("Error toggling watch state:", error);
    }
  };

  const handleToggledPinned = async () => {
    try {
      if (savedStatus[item.tmdb_id] === false) {
        handleSave(item); // Save item if it isn't already saved
      }
      const newStatus = await togglePinned(
        item.tmdb_id,
        pinnedStatus[item.tmdb_id],
        watchStatus[item.tmdb_id]
      );

      updatePinnedStatus(item.tmdb_id, Boolean(newStatus));
      refreshWatchList();
    } catch (error) {
      console.error("Error toggling pinned state:", error);
    }
  };

  if (!item) {
    return (
      <SafeAreaView
        style={globalStyles.container}
        edges={["left", "right", "bottom", "top"]}
      >
        <Header title="Details" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Error loading details</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={globalStyles.container}
      edges={["left", "right", "bottom", "top"]}
    >
      <View style={styles.headerButtons}>
        <Button
          style={styles.backButton}
          text="Back"
          icon="arrow-back"
          onPress={() => router.back()}
        ></Button>
        <Button
          icon={pinnedStatus[item.tmdb_id] ? "bookmark" : "bookmark-outline"}
          onPress={handleToggledPinned}
        ></Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Image
            style={styles.poster}
            source={{ uri: item.poster_path }}
            placeholder="https://via.placeholder.com/120x180?text=No+Image"
            contentFit="cover"
          />

          <Text style={[globalStyles.title]}>{item.title}</Text>
          <MetaInfoRow
            style={styles.metaInfoRow}
            year={item.year}
            runtime={
              item.media_type === "movie"
                ? Math.round((item.runtime_minutes / 60) * 10) / 10 + " h"
                : ""
            } // Round to one decimal  and display an empty string if the value is zero
            genre={JSON.parse(item.genres_json)
              .slice(0, 3)
              .map((genre) => genre.name)
              .join(", ")} // Parse JSON and limit to 3 genres
            rating={Math.round(item.vote_average * 10) / 10}
          />
          <View style={styles.mediaButtons}>
            <Button
              text={
                savedStatus[[item.tmdb_id]]
                  ? "Remove from Library"
                  : "Save to Library"
              }
              onPress={savedStatus[item.tmdb_id] ? handleDelete : handleSave}
              buttonTextColor={
                savedStatus[item.tmdb_id] ? COLORS.redDark : COLORS.blueDark
              }
              buttonBgColor={
                savedStatus[item.tmdb_id] ? COLORS.redLight : COLORS.blueLight
              }
            />
            <Button
              text={
                watchStatus[item.tmdb_id]
                  ? "Toggle Unwatched"
                  : "Toggle Watched"
              }
              onPress={
                savedStatus
                  ? handleToggledWatched
                  : () =>
                      alert(
                        "Please save the item before changing its watch status."
                      )
              }
              buttonTextColor={
                watchStatus[item.tmdb_id] ? COLORS.redDark : COLORS.greenDark
              }
              buttonBgColor={
                watchStatus[item.tmdb_id] ? COLORS.redLight : COLORS.greenLight
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES.sm,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mediaButtons: {
    flexDirection: "row",
    gap: SIZES.sm,
  },
});
