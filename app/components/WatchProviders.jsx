import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getProviders } from "../api/tmdb";
import globalStyles from "../utils/globalStyles";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";

export default function WatchallProviders(props) {
  const [providers, setProviders] = useState({ stream: [], buy: [], rent: [] });

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const result = await getProviders(props.tmdb_id, props.media_type);
        setProviders(result);
      } catch (error) {
        console.error("Error getting providers: ", error);
      }
    };
    loadProviders();
  }, [props.tmdb_id]);

  // Make sure at least one type of provider exist
  const hasProviders =
    providers.stream.length > 0 ||
    providers.buy.length > 0 ||
    providers.rent.length > 0;

  if (!hasProviders) {
    return (
      <View style={styles.container}>
        <Text style={globalStyles.heading}>Providers</Text>
        <Text style={globalStyles.subText}>
          Not yet available to stream, buy, or rent.
        </Text>
      </View>
    );
  }

  const renderProviderSection = (title, providerList) => {
    if (providerList.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            gap: SIZES.sm,
          }}
        >
          {providerList.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image
                style={styles.logo}
                source={{ uri: item.logo }}
                placeholder="https://via.placeholder.com/60x60?text=No+Logo"
                contentFit="cover"
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.heading}>Watch Providers</Text>
      {renderProviderSection("Stream", providers.stream)}
      {renderProviderSection("Rent", providers.rent)}
      {renderProviderSection("Buy", providers.buy)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SIZES.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  card: {
    width: 60,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: SIZES.xs,
  },
  name: {
    textAlign: "left",
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: 500,
    flexWrap: "wrap",
    width: "100%",
  },
});
