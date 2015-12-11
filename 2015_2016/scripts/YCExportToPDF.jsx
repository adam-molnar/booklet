/* YCExportToPDF.jsx
 * ---------------------------------------------------------------------------- 
 * Exports the active document to PDF and PDF Booklet
 * ---------------------------------------------------------------------------- 
 */

 /* Extend File prototype to return a file name from the path */
 File.prototype.fileName = function(){
   return this.name.replace(/.[^.]+$/,'');
 }

/* Execute main function */
main();

/**
 * Function: main
 * ----------------------------------------------------------------------------
 * The entry point for the pdf function
 * @return {} Exports the active document to pdf
 * ----------------------------------------------------------------------------
 */
function main(){
    //Make certain that user interaction (display of dialogs, etc.) is turned on.
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
    
    // Execute script only if there is an open document
    if(app.documents.length > 0){
        // Get current document
        currentDocument = app.activeDocument;
        // Export to PDF
        exportToPdf(currentDocument);
        // Save current document
        currentDocument.save();
    }
    else {
        alert("No documents are open. Please open a document and try again.");
    }
}

/**
 * Function: exportToPdf
 * ----------------------------------------------------------------------------
 * Makes a copy from the base file and saves it
 * @param {app.documents Object} (currentDocument) the current document
 * @return {} Makes a copy from the currently active file
 * ----------------------------------------------------------------------------
 */
function exportToPdf(currentDocument) {
    // Set output file name
    var PDFFileName = File(currentDocument.fullName).path + '/../../final/' + trimTimeStamp(File(currentDocument.fullName).fileName()) + ".pdf";
    alert(PDFFileName)
    // Set PDF Preset
    var preset = app.pdfExportPresets.item("YCPDFPreset");
    // Export PDF
    currentDocument.exportFile(ExportFormat.pdfType, File(PDFFileName), false, preset);
}

/**
 * Function: trimTimeStamp
 * ----------------------------------------------------------------------------
 * Makes a copy from the base file and saves it
 * @param {string} (fileName) the file name
 * @return {string} (fileName) the filename without the timestamp
 * ----------------------------------------------------------------------------
 */
function trimTimeStamp(fileName) {
    // Find position of timestamp
    startpos = fileName.indexOf('201');
    endpos = startpos + '201x_xx_xx_xx_xx'.length;

    // If timestamp found, remove it from the string
    if (startpos >= 0) {
        return fileName.substring(0, startpos) + fileName.substring(endpos + 1, fileName.length);
    } else {
        return fileName
    }
}
