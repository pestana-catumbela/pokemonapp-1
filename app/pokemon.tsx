import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/theme-context.tsx';
import { Stack, useLocalSearchParams } from 'expo-router';
import { PokemonComponent } from '../components/pokemon-component.tsx';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

interface Pokemon {
    image: string;
    height: number;
    weight: number;
}

export default function Pokemon() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    
    const { pokemonName, pokemonUrl } = useLocalSearchParams<{ pokemonName: string; pokemonUrl: string }>();
    const { themeColor } = useTheme();

    useEffect(() => {
        fetch(pokemonUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        }).then((response) => response.json()).then((data) => {
            setPokemon({
                image: data.sprites.other['official-artwork'].front_default,
                height: data.height,
                weight: data.weight
            });

            setLoading(false);
        }).catch(() => {
            setError('Erro na requisição, por favor, tente novamente!');
        });
    }, []);

    if (loading) return <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />

    return (
        <View style={{ flex: 1, backgroundColor: themeColor?.backgroundColor }}>
            <Stack.Screen options={{ title: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1), headerTintColor: themeColor?.headerColor, headerStyle: { backgroundColor: themeColor?.headerBackgroundColor } }} />

            {!pokemon && (
            <Text style={styles.error}>{error}</Text>  
            )}
            <PokemonComponent pokemonImage={pokemon?.image} pokemonHeight={pokemon?.height} pokemonWeight={pokemon?.weight} />
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        flex: 1,
        fontSize: 14,
        color: 'brown',
        textAlign: 'center',
        justifyContent: 'center'
    }
});