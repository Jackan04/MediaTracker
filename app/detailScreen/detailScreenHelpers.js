import { Alert } from "react-native";
import { Linking } from "react-native";
import {
  deleteItem,
  insertItem,
  togglePinned,
  toggleWatched,
} from "../server/queries";

export const OpenUrl = (url) => {
  return async () => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };
};


export const createHandleDelete = (
  item,
  watchStatus,
  updateSavedStatus,
  updatePinnedStatus,
  refreshWatchList
) => {
  return async () => {
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
              updatePinnedStatus(item.tmdb_id, false);
              refreshWatchList();
            } catch (error) {
              console.error("Error deleting item:", error);
            }
          },
        },
      ]
    );
  };
};

export const createHandleSave = (item, updateSavedStatus, refreshWatchList) => {
  return async () => {
    try {
      await insertItem(item);
      updateSavedStatus(item.tmdb_id, true);
      refreshWatchList();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };
};

export const createHandleToggledWatched = (
  item,
  savedStatus,
  watchStatus,
  updateWatchStatus,
  refreshWatchList,
  handleSave
) => {
  return async () => {
    try {
      if (!savedStatus[item.tmdb_id]) {
        await handleSave(); // Save item if it isn't already saved
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
};

export const createHandleToggledPinned = (
  item,
  savedStatus,
  pinnedStatus,
  watchStatus,
  updatePinnedStatus,
  refreshWatchList,
  handleSave
) => {
  return async () => {
    try {
      if (!savedStatus[item.tmdb_id]) {
        await handleSave(); // Save item if it isn't already saved
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
};
