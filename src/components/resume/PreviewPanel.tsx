import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ResumePreview from './ResumePreview';
import { useResume } from '@/context/ResumeContext';

const PreviewPanel: React.FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useResume();

  const handleDownload = async () => {
    const element = resumeRef.current;
    if (!element) {
      console.error('Resume element not found');
      return;
    }

    const filename = state.personal.fullName
      ? `${state.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';

    try {
      // Clone element to avoid modifying original
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.width = '210mm';
      document.body.appendChild(clonedElement);

      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 300));

      // Capture with html2canvas
      const canvas = await html2canvas(clonedElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: false,
        width: clonedElement.scrollWidth,
        height: clonedElement.scrollHeight,
      });

      document.body.removeChild(clonedElement);

      // Create PDF
      const pdf = new jsPDF('portrait', 'mm', 'a4', true);
      const imgWidth = 210;
      const pageHeight = 297;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      // Scale content to fit on single page if it exceeds page height
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;

      if (imgHeight > pageHeight) {
        // Content is too tall, scale it down to fit
        const scaleFactor = pageHeight / imgHeight;
        finalHeight = pageHeight;
        finalWidth = imgWidth * scaleFactor;

        // Center the scaled content horizontally
        const xOffset = (imgWidth - finalWidth) / 2;
        pdf.addImage(imgData, 'JPEG', xOffset, 0, finalWidth, finalHeight);
      } else {
        // Content fits, add as-is
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      }

      // Add clickable links
      const linkElements = element.querySelectorAll('a[href]');
      linkElements.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
          const rect = link.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const scaleFactor = imgHeight > pageHeight ? (pageHeight / imgHeight) : 1;
          const xOffset = imgHeight > pageHeight ? ((imgWidth - (imgWidth * scaleFactor)) / 2) : 0;

          const x = ((rect.left - elementRect.left) / elementRect.width) * imgWidth * scaleFactor + xOffset;
          const y = ((rect.top - elementRect.top) / elementRect.height) * finalHeight;
          const width = (rect.width / elementRect.width) * imgWidth * scaleFactor;
          const height = (rect.height / elementRect.height) * finalHeight;
          pdf.link(x, y, width, height, { url: href });
        }
      });

      pdf.save(filename);
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <main className="preview-panel">
      <div className="preview-container">
        <div className="preview-actions">
          <button onClick={handleDownload} className="btn-download">
            <Download size={18} strokeWidth={3} />
            <span>Download PDF</span>
          </button>
        </div>

        <ResumePreview ref={resumeRef} />
      </div>
    </main>
  );
};

export default PreviewPanel;
