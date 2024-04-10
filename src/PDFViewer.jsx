// PDFViewer.jsx
import React, { useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import 'pdfjs-dist/legacy/build/pdf.worker.entry';

const PDFViewer = ({ pdfPath }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfPath).promise;
        const firstPage = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = firstPage.getViewport({ scale: scale });

        const canvas = canvasRef.current;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport,
        };

        firstPage.render(renderContext);
      } catch (error) {
        console.error('Error while loading PDF', error);
      }
    };

    fetchPdf();
  }, [pdfPath]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PDFViewer;
