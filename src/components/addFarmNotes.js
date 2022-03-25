import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AuthContext from "../contexts/auth";

const AddFarmNotes = () => { 
  const history = useHistory();
  const { showDiary, setShowDiary } = useContext(AuthContext);

  const handleAction = () => {
    setShowDiary(true);
  }

  return (
    <Fab position="right-bottom" slot="fixed" color="secondary" variant="outlined" aria-label="edit" onClick={handleAction}>
        <AddIcon />
    </Fab>
    );
};

export default AddFarmNotes;
