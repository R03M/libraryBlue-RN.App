import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { deleteUserToken, setUser, setUserToken } from "../redux/userSlice";
import axios from "axios";
import { CORS_URL } from "@env";

const useUserData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataUser = async () => {
      const token = await AsyncStorage.getItem("@TokenAccess");
      const user = await AsyncStorage.getItem("@UserData");
     
      if (!user && !token) {
        dispatch(deleteUserToken());
        return;
      }

      const userObject = JSON.parse(user);
      const userData = {
        id: userObject.id,
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        fullName: userObject.fullName,
        image: userObject.image,
        position: userObject.position,
        status: userObject.status,
        accountCreation: userObject.accountCreation,
        authId: userObject.authId,
        companyId: userObject.companyId,
      };

      try {
        const response = await axios.post(
          `${CORS_URL}/user/validate`,
          userData
        );
        if (response.status === 200) {
          dispatch(setUser(userObject));
          dispatch(setUserToken(JSON.parse(token)));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDataUser();
  }, []);
};

export default useUserData;
