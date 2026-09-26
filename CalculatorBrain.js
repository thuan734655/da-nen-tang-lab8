export default class CalculatorBrain {
  constructor(height, weight) {
    this.height = height; // tính bằng cm
    this.weight = weight; // tính bằng kg
    this.bmi = 0;
  }

  // Hàm tính toán BMI
  calculateBMI() {
    // Công thức BMI = Cân nặng (kg) / [Chiều cao (m)]^2
    this.bmi = this.weight / Math.pow(this.height / 100, 2);
    return this.bmi.toFixed(1); // Làm tròn 1 chữ số thập phân
  }

  // Đánh giá thể trạng
  getResult() {
    if (this.bmi >= 25) {
      return 'THỪA CÂN';
    } else if (this.bmi > 18.5) {
      return 'BÌNH THƯỜNG';
    } else {
      return 'THIẾU CÂN';
    }
  }

  // Lời khuyên
  getInterpretation() {
    if (this.bmi >= 25) {
      return 'Bạn có cân nặng cao hơn mức bình thường. Hãy cố gắng tập thể dục nhiều hơn nhé!';
    } else if (this.bmi > 18.5) {
      return 'Tuyệt vời! Bạn có một chỉ số cơ thể rất khỏe mạnh.';
    } else {
      return 'Bạn có cân nặng thấp hơn mức bình thường. Bạn nên ăn uống tẩm bổ nhiều hơn một chút!';
    }
  }
}
