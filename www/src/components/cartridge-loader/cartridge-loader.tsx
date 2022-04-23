import { Cartridge } from 'padme-wasm';
import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

type Props = {
    onload: (c: Cartridge) => void;
};

const CartridgeLoader: FunctionalComponent<Props> = (props) => {
    const [filename, setFilename] = useState('');
    const { dispatch } = useStoreon();

    return (
        <div class="file has-name is-fullwidth">
            <label class="file-label">
                <input class="file-input" type="file" name="resume" onChange={(e) => {
                dispatch('cartridge/unload');
                const files = (e.target as HTMLInputElement).files;
                if (files && files.length > 0) {
                    const file = files[0];
                    setFilename(file.name);
                    setTimeout(async () => {
                        try {
                            const bin = await file.arrayBuffer();
                            const bin8 = new Uint8Array(bin);
                            const cartridge = Cartridge.new(bin8);
                            dispatch('cartridge/load', cartridge);
                            await props.onload(cartridge);
                        } catch (error) {
                            //setInfo(error as string);
                        }
                    }, 300);
                }
            }} />
                    <span class="file-cta">
                        <span class="file-label">
                            SELECT A GAME…
                        </span>
                    </span>
                    <span class="file-name">
                        {filename}
                    </span>
            </label>
        </div>
    );
};

export { CartridgeLoader };
