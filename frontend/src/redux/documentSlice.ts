// documentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from '../../data.json';

export interface Document { // Add export here
  createdAt: string;
  name: string;
  content: string;
}

interface DocumentsState {
  documents: Document[];
  currentDocument: Document | null;
}

const storedDocuments = JSON.parse(localStorage.getItem('documents') ?? '[]');

const initialState: DocumentsState = {
  documents: storedDocuments.length > 0 ? storedDocuments : [data],
  currentDocument: storedDocuments.find((doc: Document) => doc.name === 'welcome.md') || data,
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    createDocument: (state) => {
      const newDocument = {
        createdAt: new Date().toISOString().split('T')[0],
        name: 'Untitled Document',
        content: '# Welcome to Markdown\n\nClick to start writing.',
      };
      state.documents.push(newDocument);
      localStorage.setItem('documents', JSON.stringify(state.documents));

      // Log a message when a document is created
      console.log(`Document created: ${newDocument.name}`);
    },
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    setCurrentDocument: (state, action: PayloadAction<Document>) => {
      state.currentDocument = action.payload;
    },
    updateDocumentContent: (state, action: PayloadAction<string>) => {
      if (state.currentDocument) {
        state.currentDocument.content = action.payload;
      }
    },
  },
});

export const { createDocument, setDocuments, setCurrentDocument, updateDocumentContent } = documentsSlice.actions;

export default documentsSlice.reducer;