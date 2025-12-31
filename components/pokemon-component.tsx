import { View, Image } from 'react-native';
import { styles } from './pokemon-component.ts';

interface PokemonInfos {
    pokemonImage: string | any;
    pokemonHeight: number | any;
    pokemonWeight: number | any;
}

export function PokemonComponent({ pokemonImage, pokemonHeight, pokemonWeight, ...rest }: PokemonInfos) {
    return (
        <View style={styles.container}>
            <Image src={pokemonImage} style={{ width: 300, height: 300 }} />
        </View>
    );
}