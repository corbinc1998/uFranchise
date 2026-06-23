import { json } from 'express';
import React, { useRef, useState } from 'react';
import { getAllSeasons } from './Database/helpers';
// placeholder: add later
// import { getAllSeasons } from '../Database';


function DataManager({seasons, teams, importData})
{
    const fileInputRef = useRef(null);
    const [isImporting, setIsImporting] = useState(false);
    const [isExporting, setIsExporting] = useState(false);


    // Export data to JSON file - pulls directly from IndexedDB
    const handleExport = async () => {
        setIsExporting(true);

        try {
            // Get all seasons directly from IndexedDB
            const seasonsFromDB = await getAllSeasons;

            // Create a data object with all seasons (including playoff data)
            const dataToExport = {
                seasons: seasonsFromDB,
                exportDate: new Date().toISOString()
            };

                // Convert data to JSON string
                const jsonString = JSON.stringify(dataToExport, null, 2);

                // Create a blob from JSON data 
                // https://developer.mozilla.org/en-US/docs/Web/API/Blob
                const blob = new Blob([jsonString], {type: 'applications/json' });

                // Create temporary URL for the blob
                const url = URL.createObjectURL(blob)

                // Create temporary anchor element for download
                const a = document.createElement('a')
                a.href = url
                a.download = `uFranchise-data-${new Date().toLocaleDateString().replace(/\//g, '-')}.json)`;
                document.body.appendChild(a);

                // Trigger download
                a.click();

                // Clean up
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (error) {
                console.error('Export failed:', error)
                alert(`Failed to export data: ${error.message}`);
            } finally {
                setIsExporting(false);
            }
        
    };

    // WIP adding exporting in importing next

}


export default DataManager;