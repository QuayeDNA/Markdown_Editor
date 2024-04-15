import { useDispatch } from 'react-redux';
import { createDocument } from "../../redux/documentSlice";

function SaveButton() {
    const dispatch = useDispatch();
    return (
        <div>
            <button
                className="new-document flex items-center justify-center space-x-4 text-white w-full p-4 rounded-md"
                onClick={() => dispatch(createDocument())}>
                + New Document
            </button>
        </div>
    );
}

export default SaveButton;