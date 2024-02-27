import { createContext, useState } from 'react';
import { ContextProps } from './FirebaseContext';

export const PostContext = createContext<any | null>(null)

function Post({children}:ContextProps) {
    const [postDetails,setPostDetails] = useState<any | null>(null);
    return(
            <PostContext.Provider value={{postDetails,setPostDetails}}>
                {children}
            </PostContext.Provider>
    )
}

export default Post