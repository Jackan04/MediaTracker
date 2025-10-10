import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchByMediaType, searchMedia } from "../api/tmdb";
import Button from "../components/Button/Button";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResultCard from "../components/SearchResultCard.jsx";
import globalStyles from "../utils/globalStyles";
import { COLORS, SIZES } from "../utils/theme";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOnSubmit = async () => {
    if (!query.trim()) return;

    try {
      let results;
      if (searchFilter === "movie") {
        results = await searchByMediaType("movie", query);
      } else if (searchFilter === "tv") {
        results = await searchByMediaType("tv", query);
      } else {
        results = await searchMedia(query);
      }

      setSearchResults(results || []);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <SafeAreaView
      style={globalStyles.container}
      edges={["left", "right", "bottom", "top"]}
    >
      <Header title="Search"></Header>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleOnSubmit}
      ></SearchBar>
      <View style={styles.buttons}>
        <Button
          text="Search Movies"
          icon="film-outline"
          onPress={() =>
            setSearchFilter(searchFilter === "movie" ? "" : "movie")
          }
          buttonBgColor={
            searchFilter === "movie" ? COLORS.blueLight : COLORS.greyLight
          }
          buttonTextColor={
            searchFilter === "movie" ? COLORS.blueDark : COLORS.greyDark
          }
        />

        <Button
          text="Search Shows"
          icon="tv-outline"
          onPress={() => setSearchFilter(searchFilter === "tv" ? "" : "tv")}
          buttonBgColor={
            searchFilter === "tv" ? COLORS.blueLight : COLORS.greyLight
          }
          buttonTextColor={
            searchFilter === "tv" ? COLORS.blueDark : COLORS.greyDark
          }
        />
      </View>

      <FlatList
        style={styles.results}
        data={searchResults}
        renderItem={({ item }) => (
          <SearchResultCard
            item={item}
            posterUrl={item.poster_path}
            title={item.title}
            year={item.year}
            mediaType={item.media_type}
          />
        )}
        keyExtractor={(item) => item.tmdb_id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: SIZES.sm }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  results: {},
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  hint: {
    textAlign: "center",
    color: COLORS.subText,
    marginVertical: 12,
  },
});
