// src/redux/documentSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Document {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
}

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    loadDocuments: (state) => {
      const savedDocuments = localStorage.getItem('documents');
      if (savedDocuments) {
        state.documents = JSON.parse(savedDocuments);
      }
    },
    createDocument: (state) => {
      const newDocument: Document = {
        id: Date.now().toString(), // Use the current timestamp as a unique ID
        name: 'New Document',
        content: '',
        createdAt: new Date().toISOString(),
      };
      state.documents.push(newDocument);
      localStorage.setItem('documents', JSON.stringify(state.documents));
    },
    // Other reducers...
  },
});

export const { loadDocuments, createDocument } = documentSlice.actions;
export const selectDocuments = (state: RootState) => state.document.documents;
export default documentSlice.reducer;