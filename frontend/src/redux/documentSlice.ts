// src/redux/documentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setCurrentDocument: (state, action: PayloadAction<string>) => {
      const document = state.documents.find(doc => doc.id === action.payload);
      if (document) {
        state.currentDocument = document;
        state.currentDocumentContent = document.content;
      }
    },
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
    updateDocument: (state, action: PayloadAction<{ id: string, content: string }>) => {
      const document = state.documents.find(doc => doc.id === action.payload.id);
      if (document) {
        document.content = action.payload.content;
      }
    },
  },
});

export const { loadDocuments, createDocument,setCurrentDocument, updateDocument } = documentSlice.actions;
export const selectDocuments = (state: RootState) => state.document.documents;
export default documentSlice.reducer;