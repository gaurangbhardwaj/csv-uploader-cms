
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CSVReader } from 'react-papaparse'


const FileUploader = ({ open, csvData, onFileUpload, onRemoveFile, fileUploadAction, cancelAction }) => {
    return (
        <Dialog
            open={open}
            onClose={cancelAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Upload new CSV data"}</DialogTitle>

            <DialogContent>
                <CSVReader
                    onDrop={onFileUpload}
                    onRemoveFile={onRemoveFile}
                    addRemoveButton
                    noClick
                >
                    Drop a CSV to upload
                </CSVReader>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelAction} color="primary">
                    Cancel
                        </Button>
                <Button disabled={!csvData} onClick={fileUploadAction} color="primary" autoFocus>
                    Upload
                 </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FileUploader;