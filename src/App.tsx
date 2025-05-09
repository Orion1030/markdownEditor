// App.tsx
import React, { useState, useRef } from 'react';
import {
  Container,
  Grid,
  TextField,
  Box,
  Button,
  Typography
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);

  // Export the rendered content as PDF
  const handleExportPdf = async () => {
    try {
      if (previewRef.current) {
        await html2pdf().from(previewRef.current).save();
      }
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to export PDF');
    }
  };

  // Copy the rendered text to clipboard
  const handleCopy = async () => {
    try {
      const text = previewRef.current?.innerText || '';
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Failed to copy text');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Real-time Markdown Editor
      </Typography>
      <Grid container spacing={2}>
        {/* Markdown Input Pane */}
        <Grid item xs={12} md={6}>
          <Box component="section" aria-label="Markdown Input">
            <TextField
              multiline
              fullWidth
              minRows={20}
              placeholder="Type your markdown here..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              variant="outlined"
            />
          </Box>
        </Grid>

        {/* Preview & Controls Pane */}
        <Grid item xs={12} md={6}>
          <Box
            component="section"
            aria-label="Rendered Output"
            sx={{ border: '1px solid #ddd', p: 2, minHeight: 460 }}
          >
            <div ref={previewRef}>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleExportPdf}
              aria-label="Export to PDF"
            >
              Export PDF
            </Button>
            <Button
              variant="outlined"
              onClick={handleCopy}
              aria-label="Copy to Clipboard"
            >
              Copy Text
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
