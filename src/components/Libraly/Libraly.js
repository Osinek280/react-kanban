import React, { useState, useEffect, useRef } from "react";
import './Libraly.css';
import Navbar from "../navabr/navbar";
import fileIcon from "../../image/file-icon.svg";
import dragula from 'dragula';
import emptyState from '../../image/undraw_empty_re_opql.svg';

function Libraly({ files, replaceDate, focus }) {

  const libralyContainerRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const drake = dragula([libralyContainerRef.current]);
    return () => {
      drake.destroy();
    };
  }, []);

  const onInput = (value) => {
    setSearchValue(value);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="main-container">
      <Navbar onClose={onInput} from='Library' focus={focus} />
      {filteredFiles.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-text">No Files available</span>
          <img src={emptyState} alt="empty-state-img" />
        </div>
      ) : (
        <div className="libraly-container" ref={libralyContainerRef}>
          {filteredFiles.map((file, fileIndex) => (
            <div key={fileIndex} className="file">
              <span className="img-box" onClick={() => replaceDate(file)}>
                <img src={fileIcon} alt="" />
              </span>
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Libraly;
