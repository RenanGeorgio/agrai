import React, { } from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const AddFarmNotes = () => { 
  return (
    <Fab position="right-bottom" slot="fixed" color="secondary" variant="outlined" aria-label="edit">
        <AddIcon />
    </Fab>
    );
};

export default AddFarmNotes;
