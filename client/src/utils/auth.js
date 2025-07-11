export const getToken = () => {
    return localStorage.getItem("token");
};


// export const getToken = () => localStorage.getItem("token");

// export const getCurrentUser = () => {
//     try {
//         return JSON.parse(localStorage.getItem("user"));
//     } catch (e) {
//         return null;
//     }
// };

// export const isLoggedIn = () => {
//     return !!getToken();
// };
