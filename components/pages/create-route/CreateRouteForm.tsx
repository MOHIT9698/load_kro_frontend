import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CreateRouteForm = () => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [loadType, setLoadType] = useState('');
  const [availableSpace, setAvailableSpace] = useState('');
  const [unit, setUnit] = useState('kg');

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleCreateRoute = () => {
    console.log('Route Created', {
      startLocation,
      destination,
      loadType,
      availableSpace: `${availableSpace} ${unit}`,
      startDate,
      startTime,
      endDate,
      endTime
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (

    <View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Location</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter starting point"
              placeholderTextColor="#9CA3AF"
              value={startLocation}
              onChangeText={setStartLocation}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Destination</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter destination"
              placeholderTextColor="#9CA3AF"
              value={destination}
              onChangeText={setDestination}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Available Space</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="scale-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g., 500 kg"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={availableSpace}
              onChangeText={setAvailableSpace}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Date & Time</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[styles.inputContainer, styles.flexInput]}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
              <Text style={styles.dateTimeText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.inputContainer, styles.flexInput]}
              onPress={() => setShowStartTimePicker(true)}
            >
              <Ionicons name="time-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
              <Text style={styles.dateTimeText}>{formatTime(startTime)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>End Date & Time</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[styles.inputContainer, styles.flexInput]}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
              <Text style={styles.dateTimeText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.inputContainer, styles.flexInput]}
              onPress={() => setShowEndTimePicker(true)}
            >
              <Ionicons name="time-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
              <Text style={styles.dateTimeText}>{formatTime(endTime)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton text="Create Route" onPress={handleCreateRoute} isLoading={false} />

      </View>

  );
};

export default CreateRouteForm;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 40
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  flexInput: {
    flex: 1,
  },
  dateTimeText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});