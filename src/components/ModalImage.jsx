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
      onRequestClose={handleShowModalImage}>
      <View>
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
                resizeMode: 'stretch',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalImage;
