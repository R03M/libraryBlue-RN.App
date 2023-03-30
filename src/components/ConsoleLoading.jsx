import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const ConsoleLoading = () => {
  const [code, setCode] = useState('');
  const [charactersToShow, setCharactersToShow] = useState(0);

  useEffect(() => {
    const codeString = `[   0.000000] Initializing libraryBlue systems
    [   0.000000] Initializing cgroup subsys cpu
    [   0.000000] Initializing cgroup subsys cpuacct
    [   0.000000] BIOS-provided physical RAM map:
    [   0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009c7ff] usable
    [   0.000000] BIOS-e820: [mem 0x000000000009c800-0x000000000009ffff] reserved
    [   0.000000] BIOS-e820: [mem 0x00000000000e0000-0x00000000000fffff] reserved
    [   0.000000] BIOS-e820: [mem 0x0000000000100000-0x0000000076cfefff] usable
    [   0.000000] BIOS-e820: [mem 0x0000000076cff000-0x0000000076dfefff] ACPI NVS
    [   0.000000] BIOS-e820: [mem 0x0000000076dff000-0x0000000076dfffff] ACPI data
    [   0.000000] BIOS-e820: [mem 0x0000000076e00000-0x0000000076ffffff] reserved
    [   0.000000] BIOS-e820: [mem 0x00000000e0000000-0x00000000efffffff] reserved
    [   0.000000] BIOS-e820: [mem 0x00000000fe000000-0x00000000fe010fff] reserved
    [   0.000000] BIOS-e820: [mem 0x00000000fec00000-0x00000000fec00fff] reserved`;
    setCode(codeString);
  }, []);

  useEffect(() => {
    if (charactersToShow < code.length) {
      const timeout = setTimeout(() => {
        setCharactersToShow(charactersToShow + 1);
      }, 1);
      return () => clearTimeout(timeout);
    }
  }, [charactersToShow, code]);

  return (
    <View style={{ backgroundColor: '#000', padding: 10, flex: 1 }}>
      <Text
        style={{
          fontFamily: 'monospace',
          fontSize: 16,
          color: '#fff',
          textAlign: 'center',
          marginBottom: 8
        }}>
        Verificando información de sesión...
      </Text>
      <Text style={{ fontFamily: 'monospace', fontSize: 16, color: '#0F0' }}>
        {code.substring(0, charactersToShow)}
      </Text>
    </View>
  );
};

export default ConsoleLoading;