import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import CalculatorBrain from './CalculatorBrain';

const ACTIVE_COLOR = '#1D1E33';
const INACTIVE_COLOR = '#111328';
const BOTTOM_BUTTON_COLOR = '#EB1555';

export default function App() {
  // Trạng thái các thông số
  const [isMale, setIsMale] = useState(true);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(25);
  
  // Trạng thái điều hướng màn hình
  const [showResult, setShowResult] = useState(false);
  const [bmiData, setBmiData] = useState({});

  // Hàm tính toán và chuyển màn hình
  const calculate = () => {
    const calc = new CalculatorBrain(height, weight);
    setBmiData({
      bmi: calc.calculateBMI(),
      result: calc.getResult(),
      interpretation: calc.getInterpretation()
    });
    setShowResult(true); // Hiển thị màn hình kết quả
  };

  // 1. KỸ THUẬT CUSTOM COMPONENT:
  // Viết một khối Card chung để tái sử dụng nhiều lần ở phần giao diện bên dưới, giúp code cực ngắn.
  const Card = ({ color, children, onPress }) => (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={[styles.card, { backgroundColor: color }]} 
      onPress={onPress}
      disabled={!onPress} // Nếu không truyền hàm onPress vào thì không cho bấm
    >
      {children}
    </TouchableOpacity>
  );

  // 2. KỸ THUẬT ĐIỀU HƯỚNG MÀN HÌNH (ROUTING CƠ BẢN):
  // Nếu showResult = true thì trả ra màn hình xanh lá cây (Kết quả)
  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kết quả của bạn</Text>
        
        <View style={[styles.card, { flex: 5, backgroundColor: ACTIVE_COLOR, justifyContent: 'space-evenly', alignItems: 'center', margin: 20 }]}>
          <Text style={styles.resultText}>{bmiData.result}</Text>
          <Text style={styles.bmiText}>{bmiData.bmi}</Text>
          <Text style={styles.interpretationText}>{bmiData.interpretation}</Text>
        </View>

        <TouchableOpacity style={styles.bottomButton} onPress={() => setShowResult(false)}>
          <Text style={styles.bottomButtonText}>TÍNH LẠI</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Nếu showResult = false thì trả ra màn hình Nhập liệu mặc định
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.headerTitle}>BMI CALCULATOR</Text>

      {/* Hàng 1: Giới tính (Tái sử dụng component Card) */}
      <View style={styles.row}>
        <Card color={isMale ? ACTIVE_COLOR : INACTIVE_COLOR} onPress={() => setIsMale(true)}>
          <FontAwesome5 name="mars" size={60} color={isMale ? "white" : "#8D8E98"} />
          <Text style={styles.label}>NAM</Text>
        </Card>
        <Card color={!isMale ? ACTIVE_COLOR : INACTIVE_COLOR} onPress={() => setIsMale(false)}>
          <FontAwesome5 name="venus" size={60} color={!isMale ? "white" : "#8D8E98"} />
          <Text style={styles.label}>NỮ</Text>
        </Card>
      </View>

      {/* Hàng 2: Chiều cao */}
      <View style={styles.row}>
        <Card color={ACTIVE_COLOR}>
          <Text style={styles.label}>CHIỀU CAO</Text>
          <View style={styles.numberRow}>
            <Text style={styles.numberText}>{height}</Text>
            <Text style={styles.label}>cm</Text>
          </View>
          {/* Thanh trượt sử dụng thư viện ngoài */}
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={120}
            maximumValue={220}
            step={1}
            value={height}
            onValueChange={val => setHeight(val)}
            minimumTrackTintColor={BOTTOM_BUTTON_COLOR}
            maximumTrackTintColor="#8D8E98"
            thumbTintColor={BOTTOM_BUTTON_COLOR}
          />
        </Card>
      </View>

      {/* Hàng 3: Cân nặng & Tuổi */}
      <View style={styles.row}>
        <Card color={ACTIVE_COLOR}>
          <Text style={styles.label}>CÂN NẶNG</Text>
          <Text style={styles.numberText}>{weight}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.roundButton} onPress={() => setWeight(w => w - 1)}>
              <FontAwesome5 name="minus" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton} onPress={() => setWeight(w => w + 1)}>
              <FontAwesome5 name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Card>
        
        <Card color={ACTIVE_COLOR}>
          <Text style={styles.label}>TUỔI</Text>
          <Text style={styles.numberText}>{age}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.roundButton} onPress={() => setAge(a => a - 1)}>
              <FontAwesome5 name="minus" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton} onPress={() => setAge(a => a + 1)}>
              <FontAwesome5 name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Card>
      </View>

      {/* Nút Tính Toán */}
      <TouchableOpacity style={styles.bottomButton} onPress={calculate}>
        <Text style={styles.bottomButtonText}>TÍNH TOÁN</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E21' }, // Nền Dark mode
  headerTitle: { color: 'white', textAlign: 'center', fontSize: 20, marginVertical: 15, fontWeight: 'bold' },
  row: { flex: 1, flexDirection: 'row', paddingHorizontal: 10 },
  card: { flex: 1, margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  label: { color: '#8D8E98', fontSize: 18, marginTop: 15, fontWeight: 'bold' },
  numberText: { color: 'white', fontSize: 50, fontWeight: '900' },
  numberRow: { flexDirection: 'row', alignItems: 'baseline' },
  buttonRow: { flexDirection: 'row', marginTop: 10 },
  roundButton: { width: 50, height: 50, backgroundColor: '#4C4F5E', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  bottomButton: { backgroundColor: BOTTOM_BUTTON_COLOR, height: 80, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  bottomButtonText: { color: 'white', fontSize: 25, fontWeight: 'bold' },
  
  // Style cho màn hình 2
  title: { fontSize: 40, fontWeight: 'bold', color: 'white', marginLeft: 20, marginTop: 20 },
  resultText: { color: '#24D876', fontSize: 22, fontWeight: 'bold' },
  bmiText: { fontSize: 100, fontWeight: 'bold', color: 'white' },
  interpretationText: { fontSize: 20, color: 'white', textAlign: 'center', paddingHorizontal: 20, lineHeight: 30 }
});
