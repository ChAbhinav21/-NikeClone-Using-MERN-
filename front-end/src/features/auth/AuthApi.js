// front-end/src/features/auth/AuthApi.js
export async function   createUser(userData){
  const user = await fetch('http://localhost:8080/user/',{
    method:"POST",
   headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
     body: JSON.stringify(userData),
  });
  if(!user.ok){
    throw new Error("Failed to create user");
  }
  const data = await user.json();
  return data;
}

export async function fetchUser(userData){
    const user = await fetch('http://localhost:8080/user/login',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(userData) 
    })
    if(!user.ok)throw new Error("Failed to login")
    const data = await user.json()
    return data;
}

export async function fetchCurrentUser() {
    const res = await fetch('http://localhost:8080/user/currentUser', {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch current user");
    const data = await res.json();
    return data.user; // null if not logged in
}