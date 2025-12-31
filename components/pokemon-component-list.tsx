import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { styles } from './pokemon-component-list.ts';
import { useTheme } from '../context/theme-context.tsx';

interface PokemonComponentListProps {
    pokemonName: string;
    pokemonUrl: string;
}

export function PokemonComponentList({ pokemonName, pokemonUrl }: PokemonComponentListProps) {
    const { themeColor } = useTheme();

    return (
        <Link href={{ pathname: '/pokemon', params: {pokemonName, pokemonUrl} }} style={[styles.container, {borderColor: themeColor?.componentListBorderColor}]}>
            <View>
                <Text style={[styles.containerName, {color: themeColor?.componentListTextColor}]}>{pokemonName}</Text>
                <Text style={[styles.containerUrl, {color: themeColor?.componentListUrlColor}]}>{pokemonUrl}</Text>
            </View>
        </Link>
    );
}