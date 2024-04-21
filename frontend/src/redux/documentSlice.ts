import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface DocumentState {
  content: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  documents: Document[];
  selectedDocument: Document | null;
}

interface UpdateDocumentContentPayload {
  id: string;
  content: string;
}

interface UpdateDocumentNamePayload {
  id: string;
  name: string;
}

interface DeleteDocumentPayload {
  id: string;
}

interface Document {
  id: string;
  name: string;
  createdAt: string;
  content: string;
}

// Define type for the data stored in localStorage
type StoredDocument = {
  id: string;
  name: string;
  createdAt: string;
  content: string;
}[];

const savedDocuments = localStorage.getItem('documents');
const lastSelectedDocumentId = localStorage.getItem('lastSelectedDocumentId');
const initialState: DocumentState = {
  content: '',
  status: 'idle',
  error: null,
  documents: savedDocuments ? (JSON.parse(savedDocuments) as StoredDocument) : [],
  selectedDocument: null,
};

if (lastSelectedDocumentId && savedDocuments) {
  initialState.selectedDocument = JSON.parse(savedDocuments).find((doc: Document) => doc.id === lastSelectedDocumentId);
}

export const fetchDocument = createAsyncThunk('document/fetchDocument', async () => {
  const response = await fetch('../../data.json');
  const data = await response.json();
  return data.content;
});

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    updateDocumentContent: (state, action: PayloadAction<UpdateDocumentContentPayload>) => {
      const { id, content } = action.payload;
      // Update content in state.documents
      const documentIndex = state.documents.findIndex(doc => doc.id === id);
      if (documentIndex !== -1) {
        state.documents[documentIndex].content = content;
        // Update selectedDocument if it matches the updated document
        if (state.selectedDocument?.id === id) {
          state.selectedDocument.content = content;
        }
        localStorage.setItem('documents', JSON.stringify(state.documents));
      }
    },
    updateDocumentName: (state, action: PayloadAction<UpdateDocumentNamePayload>) => {
      const { id, name } = action.payload;
      // Update name in state.documents
      const documentIndex = state.documents.findIndex(doc => doc.id === id);
      if (documentIndex !== -1) {
        state.documents[documentIndex].name = name;
        // Update selectedDocument if it matches the updated document
        if (state.selectedDocument?.id === id) {
          state.selectedDocument.name = name;
        }
        localStorage.setItem('documents', JSON.stringify(state.documents));
      }
    },
    createDocument(state) {
      // Create a new document
      const newDocument: Document = {
        id: Date.now().toString(),
        name: 'Untitled',
        createdAt: new Date().toISOString(),
        content: '',
      };
      state.documents.push(newDocument);
      localStorage.setItem('documents', JSON.stringify(state.documents));
    },
    selectDocument: (state, action: PayloadAction<string>) => {
      const selectedDocument = state.documents.find(doc => doc.id === action.payload) || null;
      state.selectedDocument = selectedDocument;
      localStorage.setItem('lastSelectedDocumentId', action.payload);
    },
    deleteDocument: (state, action: PayloadAction<DeleteDocumentPayload>) => {
        const { id } = action.payload;
        // Remove the document with the specified ID from state.documents
        state.documents = state.documents.filter(doc => doc.id !== id);
        // Set selectedDocument to null if it matches the deleted document
        if (state.selectedDocument?.id === id) {
          state.selectedDocument = null;
        }
        
        // Update localStorage
        localStorage.setItem('documents', JSON.stringify(state.documents));
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocument.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocument.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        // Check if there is a last selected document ID stored in localStorage
        const lastSelectedDocumentId = localStorage.getItem('lastSelectedDocumentId');
        if (lastSelectedDocumentId && state.documents.find(doc => doc.id === lastSelectedDocumentId)) {
          // If a last selected document exists, set selectedDocument to it
          state.selectedDocument = state.documents.find(doc => doc.id === lastSelectedDocumentId) || null;
        } else {
          // Otherwise, set the default "Welcome" document
          state.selectedDocument = {
            id: 'dataJson', // You can use a unique identifier here
            name: 'Welcome',
            createdAt: new Date().toISOString(),
            content: action.payload, // Set the content here
          };
        }
      })
      .addCase(fetchDocument.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export const { updateDocumentContent, updateDocumentName, createDocument, selectDocument, deleteDocument } = documentSlice.actions;
export default documentSlice.reducer;
