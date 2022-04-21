import { FunctionalComponent, h } from 'preact';
import { useStoreon } from 'storeon/preact';

import style from './cartridge-info.scss';

const CartridgeInfo: FunctionalComponent<{}> = () => {
    const {
        cartridge: {
            loaded,
            title,
            type,
            licensee,
            romSize,
            ramSize,
            colorMode,
            isJp,
            version,
            checksum,
        }
    } = useStoreon('cartridge');

    const loadedClass = loaded ? style.loaded : '';
    return (
        <div class={`${style.cartridge} ${loadedClass}`}>
            <div class={style.header}>
                <div class={style.title}>{title}</div>
            </div>
            <div class={style.body}>
                <table>
                    <tr>
                        <td>Cartridge type:</td><td class={style.value}>{type}</td>
                    </tr>
                    <tr>
                        <td>Licensee:</td><td class={style.value}>{licensee}</td>
                    </tr>
                    <tr>
                        <td>Size:</td><td class={style.value}>{romSize} KB</td>
                    </tr>
                    <tr>
                        <td>Ram size:</td><td class={style.value}>{ramSize} KB</td>
                    </tr>
                    <tr>
                        <td>Color support:</td><td class={style.value}>{colorMode}</td>
                    </tr>
                    <tr>
                        <td>Japanese:</td><td class={style.value}>{isJp ? 'Yes': 'No'}</td>
                    </tr>
                    <tr>
                        <td>Version:</td><td class={style.value}>{version}</td>
                    </tr>
                    <tr>
                        <td>Checksum:</td><td class={style.value}>{checksum ? '✔' : '✘'}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export { CartridgeInfo };
