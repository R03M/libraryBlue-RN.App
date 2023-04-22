import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { naImg } from '../utils/naImg';

const ModalImage = ({
  modalImage,
  handleShowModalImage,
  setModalImage,
  image,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalImage}
      onRequestClose={handleShowModalImage}
      transparent={true}>
      <View style={{ backgroundColor: '#00000080' }}>
        <TouchableOpacity onPress={() => setModalImage(!modalImage)}>
          <View
            style={{
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              padding: 10,
            }}>
            <Image
              source={{
                uri: image ? image : naImg,
              }}
              style={{
                flex: 1,
                resizeMode: 'contain',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalImage;
