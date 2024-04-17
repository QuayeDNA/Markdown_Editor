// documentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Document { // Add export here
  createdAt: string;
  name: string;
  content: string;
  readonly?: boolean;
}

interface DocumentState {
  currentDocument: Document;
  documents: Document[];
}

const storedDocuments = JSON.parse(localStorage.getItem('documents') ?? '[]');
const storedTempDocuments = JSON.parse(localStorage.getItem('tempDocuments') ?? '[]');
const storedCurrentDocument = JSON.parse(localStorage.getItem('currentDocument') ?? '{}');

const initialState: DocumentState = {
  currentDocument: storedTempDocuments.length > 0 ? storedTempDocuments[0] : storedCurrentDocument,
  documents: storedDocuments,
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
    saveDocument: (state, action: PayloadAction<Document>) => {
      const updatedDocument = action.payload;
      state.documents = state.documents.map(document =>
        document.name === updatedDocument.name ? updatedDocument : document
      );
      localStorage.setItem('documents', JSON.stringify(state.documents));
    },
    tempSaveDocument: (state, action: PayloadAction<Document>) => {
      const updatedDocument = action.payload;
      state.currentDocument = updatedDocument;
      state.documents = state.documents.map(document =>
        document.name === updatedDocument.name ? updatedDocument : document
      );
      localStorage.setItem('tempDocuments', JSON.stringify(state.documents));
      setTimeout(() => {
        localStorage.removeItem('tempDocuments');
      }, 60000); // Remove changes after 1 minute
    },
  },
});

export const { createDocument, setDocuments, setCurrentDocument, updateDocumentContent, saveDocument, tempSaveDocument } = documentsSlice.actions;

export default documentsSlice.reducer;