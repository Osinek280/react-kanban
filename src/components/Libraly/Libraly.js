import React, { useState, useEffect, useRef } from "react";
import "./Libraly.css";
import Navbar from "../navabr/navbar";
import fileIcon from "../../image/file-icon.svg";
import dragula from "dragula";
import EmptyState from "../emptyState/emptyState";
import SectionModal from "../SectionModal/SectionModal";

function Library({ files, replaceDate, focus, updateFiles }) {
  const libraryContainerRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextIndex, setContextIndex] = useState(-1);

  useEffect(() => {
    const drake = dragula([libraryContainerRef.current]);
    return () => {
      drake.destroy();
    };
  }, []);

  const onInput = (value) => {
    setSearchValue(value);
  };

  const filteredFiles = files.filter(
    (file) =>
      file.name &&
      file.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="main-container">
      {isModalOpen && (
        <SectionModal
          fromTask={false}
          onClose={() => setIsModalOpen(!isModalOpen)}
          updateFiles={updateFiles}
        />
      )}
      <Navbar
        onClose={onInput}
        from="Library"
        focus={focus}
        onOpen={() => setIsModalOpen(!isModalOpen)}
      />
      {filteredFiles.length === 0 ? (
        <EmptyState value={'No files available'}/>
      ) : (
        <div className="library-container" ref={libraryContainerRef}>
          {filteredFiles.map((file, fileIndex) => (
            <div key={fileIndex} className="file-con">
              <div
                className="file"
                onMouseDown={(e) => {
                  if (e.button === 0) {
                    replaceDate(file);
                  } else if (e.button === 2) {
                    if (contextIndex === fileIndex) {
                      setContextIndex(-1);
                    } else {
                      setContextIndex(fileIndex);
                    }
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              >
                <span className="img-box">
                  <img src={fileIcon} alt="" />
                </span>
                <span>{file.name}</span>
              </div>
              {contextIndex === fileIndex && (
                <span className="context-menu">
                  <span className="item">Add New Task</span>
                  <span className="item">Delete</span>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
