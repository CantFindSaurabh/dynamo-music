import './SongList.css'
export default function SongList(props) {
    return (
        <tr className="SongList" onClick={props.changeSong.bind(this, props.song.id)}>
            <td >
                {props.serial + "."}
            </td>
            <td>
                <p><strong>{props.song.song}</strong></p>
            </td>
            <td>
                <p>{props.song.primary_artists}</p>
            </td>
            <td>
                <p>{props.song.year}</p>
            </td>
        </tr>
    )
}
