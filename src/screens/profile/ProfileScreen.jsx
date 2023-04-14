import { useSelector } from 'react-redux';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import stylesGlobal from '../../styles/global';
import styles from './profile.Styles';
import useFeedback from '../../hooks/useFeedback';
import FeedbackOfAPI from '../../components/FeedbackOfAPI';
import { notProfile } from '../../utils/naImg';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isDarkTheme = useTheme();
  const styleText = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const { dataUser } = useSelector((state) => state.user);

  const {
    selectCompanyStatus,
    statusChangeTypeAccount,
    statusUpdateProfile,
    statusDiscOfCompany,
    statusUpdateCompany,
    statusDeleteUser,
    statusDisassociatedComp,
  } = useSelector((state) => state.user);

  const feedbackDisscCompany = useFeedback(selectCompanyStatus);
  const feedbackChangeTypeAcc = useFeedback(statusChangeTypeAccount);
  const feedbackUpdateProfile = useFeedback(statusUpdateProfile);
  const feedbackDisconnectCompany = useFeedback(statusDiscOfCompany);
  const feedbackUpdateCompany = useFeedback(statusUpdateCompany);
  const feedbackDeleteUser = useFeedback(statusDeleteUser);
  const feedbackDisassociatedComp = useFeedback(statusDisassociatedComp);

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
          <FeedbackOfAPI value={statusUpdateProfile} type={'update'} />
        </View>
      )}

      {feedbackDisconnectCompany && ( // alert disconnect of company
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={statusDiscOfCompany} type={'update'} />
        </View>
      )}

      {feedbackUpdateCompany && ( // alert update company
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={statusUpdateCompany} type={'update'} />
        </View>
      )}

      {feedbackDeleteUser && ( // alert delete user
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={feedbackDeleteUser} type={'delete'} />
        </View>
      )}

      {feedbackDisassociatedComp && ( // alert Disassociated Comp.
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={statusDisassociatedComp} type={'update'} />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuUser')}>
          <View style={styles.cards}>
            <Text style={styles.nameUser}>{dataUser.fullName}</Text>
            <View style={styles.viewImg}>
              <Image
                source={{ uri: dataUser.image ?? notProfile }}
                style={styles.img}
              />
            </View>
            <View style={styles.viewData}>
              <View style={styles.rowsBetween}>
                <Text style={[styles.text, styleText]}>Inicio</Text>
                <Text style={styleText}>{dataUser.accountCreation}</Text>
              </View>
              <View style={styles.rowsBetween}>
                <Text style={[styles.text, styleText]}>Tipo de Cuenta</Text>
                <Text style={styleText}>
                  {dataUser.position === 'Manager'
                    ? 'Coordinador'
                    : 'Colaborador'}
                </Text>
              </View>
              <View style={styles.rowsBetween}>
                <Text style={[styles.text, styleText]}>Email</Text>
                <Text style={styleText}>{dataUser.auth?.email}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {dataUser.company ? (
          <TouchableOpacity
            onPress={() =>
              dataUser.position === 'Manager' &&
              navigation.navigate('MenuCompany')
            }>
            <View style={[stylesGlobal.line, styles.line]}></View>
            <View style={styles.cards}>
              <Text style={[styles.companyTitle, styleText]}>
                {dataUser.company.name}
              </Text>
              <View style={styles.viewImgCompany}>
                <Image
                  source={{ uri: dataUser.company && dataUser.company.image }}
                  style={styles.img}
                />
              </View>

              <View style={styles.viewData}>
                <View style={styles.rowsBetween}>
                  <Text style={[styles.text, styleText]}>Cargo</Text>
                  <Text style={styleText}>{dataUser.position}</Text>
                </View>
                <View style={styles.rowsBetween}>
                  <Text style={[styles.text, styleText]}>
                    Compañia Associada
                  </Text>
                  <Text style={styleText}>
                    {dataUser.company.associatedCompany
                      ? dataUser.company.associatedCompany
                      : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
