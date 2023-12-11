import { useState } from "react"
import { Folder } from "./components/FolderStructure"


const App = () => {
  const initialTree = [
    {
      Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
    },
    {
      Desktop: ["Screenshot1.jpg", "videopal.mp4"],
    },
    {
      Downloads: [
        {
          Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
        },
        {
          Applications: ["Webstorm.dmg", "Pycharm.dmg", "FileZila.dmg", "Mattermost.dmg"],
        },
        "chromedriver.dmg",
      ],
    },
  ]

  const [tree, setTree] = useState(initialTree)

  const handleAddFile = (folderName, fileName) => {
    setTree((prevTree) =>
      prevTree.map((item) =>
        item[folderName]
          ? { [folderName]: [...item[folderName], fileName] }
          : { ...item }
      )
    )
  }

  const handleEditFile = (folderName, oldFileName, newFileName) => {
    setTree((prevTree) =>
      prevTree.map((item) =>
        item[folderName]
          ? { [folderName]: item[folderName].map((file) => (file === oldFileName ? newFileName : file)) }
          : { ...item }
      )
    )
  }

  const handleDeleteFile = (folderName, fileName) => {
    setTree((prevTree) =>
      prevTree.map((item) =>
        item[folderName]
          ? { [folderName]: item[folderName].filter((file) => file !== fileName) }
          : { ...item }
      )
    )
  }

  return (
    <div className="folder-structure">
      <div className="folders d-flex align-items-start flex-column">
        <h1>Folder Structure</h1>
        {tree.map((item) => (
          <Folder
            key={Object.keys(item)[0]}
            name={Object.keys(item)[0]}
            content={Object.values(item)[0]}
            depth={0}
            onAddFile={handleAddFile}
            onEditFile={handleEditFile}
            onDeleteFile={handleDeleteFile}
          />
        ))}
      </div>
    </div>
  )
}

export default App