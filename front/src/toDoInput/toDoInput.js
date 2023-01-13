import styles from './toDoInput.module.css'
import { useState, useEffect } from 'react'

export default function Input({onTitleChange, onDescChange, itemTitle, itemDesc}) {     
    const [titleValue, setTitleValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")

    useEffect(() => {
        setTitleValue(itemTitle)
        setDescriptionValue(itemDesc)
    }, [itemTitle, itemDesc])

    return (
        <div className={styles.input}>
            <input placeholder="Title..." required={true} onChange={onTitleChange} value={titleValue}/>
            <input placeholder="Description..." onChange={onDescChange} value={descriptionValue}/>
        </div>
    )
}