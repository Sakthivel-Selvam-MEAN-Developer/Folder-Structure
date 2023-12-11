import { useState } from "react"

const Folder = ({ name, content, depth, onAddFile, onEditFile, onDeleteFile }) => {
    const [isExpanded, setExpanded] = useState(true)

    const handleToggle = () => {
        setExpanded(!isExpanded)
    }

    const handleAddFile = () => {
        const fileName = prompt('Enter file name:')
        if (fileName) {
            onAddFile(name, fileName)
        }
    }

    const handleEditFile = (fileName) => {
        const newFileName = prompt('Enter new file name:', fileName)
        if (newFileName) {
            onEditFile(name, fileName, newFileName)
        }
    }

    const handleDeleteFile = (fileName) => {
        if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
            onDeleteFile(name, fileName)
        }
    }

    const handleAddImage = (item) => {
        const itemType = item.split('.').map((val, index, item) => {
            if(index + 1 === item.length){
                if(val === 'jpg'){
                    return <img className="ms-2 me-2" src="./image-svgrepo-com.svg" alt="image" width={20}/>
                } else if (val === 'mp4') {
                    return <img className="ms-2 me-2" src="./video-svgrepo-com.svg" alt="image" width={20}/>
                } else {
                    return <img className="ms-2 me-2" src="./menu-svgrepo-com.svg" alt="image" width={20}/>
                }
            }
        })
        return itemType
    }



    return (
        <div style={{ marginLeft: depth * 20 }} className="folder">
            <div>
                <span onClick={handleToggle} style={{ cursor: 'pointer' }}>
                    {isExpanded ? <img src="./down-sign-svgrepo-com.svg" style={{transform: !isExpanded ? 'rotate(-90deg)' : 'none'}} alt="down-sign" width={15} className="ms-2 me-2 " id='down-sign' /> : <img src="./down-sign-svgrepo-com.svg" style={{transform:'rotate(-90deg)'}} alt="down-sign" width={15} className="ms-2 me-2 " id='down-sign' />}
                </span>
                {name}
                <button className="btn" onClick={handleAddFile}>
                    <img src="./add-file-8-svgrepo-com.svg" alt="add-file" width={25} />
                </button>
            </div>
            {isExpanded && (
                <ul className="list-unstyled">
                    {content.map((item, index) => (
                        <li key={typeof item === 'object' ? Object.keys(item)[0] : `${item}_${index}`}>
                            {Array.isArray(item) ? (
                                <Folder
                                    name={Object.keys(item)[0]}
                                    content={Object.values(item)[0]}
                                    depth={depth + 1}
                                    onAddFile={onAddFile}
                                    onEditFile={onEditFile}
                                    onDeleteFile={onDeleteFile}
                                />
                            ) : (
                                <div>
                                    {typeof item === 'object' ? (
                                        Object.keys(item).map((nestedFolder) => (
                                            <Folder
                                                key={nestedFolder}
                                                name={nestedFolder}
                                                content={item[nestedFolder]}
                                                depth={depth + 1}
                                                onAddFile={onAddFile}
                                                onEditFile={onEditFile}
                                                onDeleteFile={onDeleteFile}
                                            />
                                        ))
                                    ) : (
                                        <>
                                            {handleAddImage(item)}{item}
                                            <button onClick={() => handleEditFile(item)} className="btn">
                                                <img src="./edit-alt-svgrepo-com.svg" alt="edit" width={25} />
                                            </button>
                                            <button className="btn" onClick={() => handleDeleteFile(item)}>
                                                <img src="./delete-alt-2-svgrepo-com.svg" alt="delete" width={25} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export { Folder }  