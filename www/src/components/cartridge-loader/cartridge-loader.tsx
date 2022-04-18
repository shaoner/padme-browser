import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import style from './cartridge-loader.scss';

type Props = {
    onload: (file: File) => void;
};

const CartridgeLoader: FunctionalComponent<Props> = (props) => {
    const [filename, setFilename] = useState('');
    const [info, setInfo] = useState('');

    return (
        <div class={style.container}>
            <label class="button" for="cartridge-file"/>
            <input id="cartridge-file" type="file" onChange={async (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files && files.length > 0) {
                    const file = files[0];
                    setFilename(file.name);
                    try {
                        await props.onload(file);
                    } catch (error) {
                        setInfo(error as string);
                    }
                }
            }} />
            <span class={style.filename}>{filename}</span>
            <div class={style.info}>{info}</div>
        </div>
    );
};

export { CartridgeLoader };
