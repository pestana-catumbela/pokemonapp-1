import { Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/theme-context.tsx';
import { PokemonComponentList } from '../components/pokemon-component-list.tsx';
import { Text, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

type Pokemon = {
    name: string;
    url: string;
}

type ApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

const PAGE_LIMIT = 20;
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export default function Home() {
    const [count, setCount] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [toggleIcon, setToggleIcon] = useState<'moon' | 'sun'>('moon');
    const [nextUrl, setNextUrl] = useState<string | null>(`${BASE_URL}?limit=${PAGE_LIMIT}`);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const { setTheme, themeColor } = useTheme();

    const handleToggleIcon = () => {
        setToggleIcon(prevIcon => prevIcon === 'moon' ? 'sun' : 'moon');
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }

    const FetchAPI = async (url: string | null) => {
        if (!url) return;
        setLoading(true);

        try {
            const request = await fetch(url, { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json' } });
            const response: ApiResponse = await request.json();
            setPokemon(response.results);
            setNextUrl(response.next);
            setPrevUrl(response.previous);
        } catch (error) {
            setError('Erro na requisição, por favor, tente novamente!');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { FetchAPI(BASE_URL); }, []);

    if (loading) return <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />

    return (
        <View style={{ flex: 1, backgroundColor: themeColor.backgroundColor }}>
            <Stack.Screen options={{ title: 'Pokemons', headerTintColor: themeColor.headerColor, headerStyle: { backgroundColor: themeColor.headerBackgroundColor }, headerRight: ({tintColor}) => <Feather name={toggleIcon} size={24} color={tintColor} onPress={() => handleToggleIcon()} /> }} />

            {pokemon && (
                <FlatList
                    data={pokemon}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => <PokemonComponentList pokemonName={item.name} pokemonUrl={item.url} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.containerList}
                />
            )}
            <Text style={styles.containerTextError}>{error}</Text>

            <View style={styles.containerPrevNext}>
                <Feather name="chevrons-left" size={20} color={!prevUrl ? themeColor.colorDisabled : themeColor.color} onPress={() => [FetchAPI(prevUrl), setCount(c => c - 1)]} disabled={!prevUrl || loading} />
                <Text style={[styles.containerPrevNextText, {color: themeColor.color}]}>{count}</Text>
                <Feather name="chevrons-right" size={20} color={!nextUrl ? themeColor.colorDisabled : themeColor.color} onPress={() => [FetchAPI(nextUrl), setCount(c => c + 1)]} disabled={!nextUrl || loading} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerList: {
        gap: 13,
        paddingVertical: 20
    },

    containerTextError: {
        flex: 1,
        fontSize: 14,
        color: 'brown',
        textAlign: 'center',
        justifyContent: 'center'
    },

    containerPrevNext: {
        gap: 10,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    containerPrevNextText: {
        fontSize: 16,
        fontWeight: 500
    }
});