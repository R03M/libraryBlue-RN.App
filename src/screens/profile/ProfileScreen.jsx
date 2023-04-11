import { useSelector } from 'react-redux';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import stylesGlobal from '../../styles/global';
import styles from './profile.Styles';
import useFeedback from '../../hooks/useFeedback';
import FeedbackOfAPI from '../../components/FeedbackOfAPI';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isDarkTheme = useTheme();
  const styleText = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const user = useSelector((state) => state.user.dataUser);
  const { selectCompanyStatus, statusChangeTypeAccount, statusUpdateP } = useSelector(
    (state) => state.user
  );

  const feedbackDisscCompany = useFeedback(selectCompanyStatus);
  const feedbackChangeTypeAcc = useFeedback(statusChangeTypeAccount);
  const feedbackUpdateProfile = useFeedback(statusUpdateP);

  return (
    <View
      style={
        isDarkTheme
          ? [styles.container, stylesGlobal.backDark]
          : [styles.container, stylesGlobal.backLight]
      }>
      {feedbackDisscCompany && ( // alert disconnect of current company
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={selectCompanyStatus} type={'update'} />
        </View>
      )} 

      {feedbackChangeTypeAcc && ( // alert change type account
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={statusChangeTypeAccount} type={'update'} />
        </View>
      )}

      {feedbackUpdateProfile && ( // alert update profile
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={statusUpdateP} type={'update'} />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuUser')}>
          <View style={styles.cards}>
            <Text style={styles.nameUser}>{user.fullName}</Text>
            <View style={styles.viewImg}>
              <Image source={{ uri: user.image }} style={styles.img} />
            </View>
            <View style={styles.viewData}>
              <View style={styles.rowsBetween}>
                <Text style={[styles.text, styleText]}>Inicio</Text>
                <Text style={styleText}>{user.accountCreation}</Text>
              </View>
              <View style={styles.rowsBetween}>
                <Text style={[styles.text, styleText]}>Tipo de Cuenta</Text>
                <Text style={styleText}>
                  {user.position === 'Manager' ? 'Coordinador' : 'Cooperador'}
                </Text>
              </View>
              <View style={styles.rowsBetween}>
                <Text style={[styles.text, styleText]}>Email</Text>
                <Text style={styleText}>{user.auth.email}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            user.position === 'Manager' && navigation.navigate('MenuCompany')
          }>
          <View style={[stylesGlobal.line, styles.line]}></View>
          {user.company ? (
            <View style={styles.cards}>
              <Text style={[styles.companyTitle, styleText]}>
                {user.company.name}
              </Text>
              <View style={styles.viewImgCompany}>
                <Image
                  source={{ uri: user.company.image }}
                  style={styles.img}
                />
              </View>

              <View style={styles.viewData}>
                <View style={styles.rowsBetween}>
                  <Text style={[styles.text, styleText]}>Cargo</Text>
                  <Text style={styleText}>{user.position}</Text>
                </View>
                <View style={styles.rowsBetween}>
                  <Text style={[styles.text, styleText]}>
                    Compañia Associada
                  </Text>
                  <Text style={styleText}>
                    {user.company.associatedCompany
                      ? user.company.associatedCompany
                      : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
