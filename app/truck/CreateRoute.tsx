import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CreateRouteForm from "@/components/pages/create-route/CreateRouteForm"
import { CreateRouteIcon } from '@/assets/icons/SvgIcons';
import { Colors } from '@/constants/theme';


const TruckRouteScreen = () => {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        {/* <Ionicons name="add" size={40} color="#fff" /> */}
                        <CreateRouteIcon size={50} fill={Colors.light.background} />
                    </View>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Create New Route</Text>
                    <Text style={styles.subtitle}>Schedule your journey and find loads</Text>
                </View>

                      <View style={styles.card}>

                <CreateRouteForm />
                </View>

                <View style={styles.tipContainer}>
                    <View style={styles.tipBorder} />
                    <View style={styles.tipContent}>
                        <Text style={styles.tipText}>
                            <Text style={styles.tipEmoji}>💡 </Text>
                            <Text style={styles.tipBold}>Pro Tip: </Text>
                            Create routes in advance to get more load requests from companies!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>

    );
}

export default TruckRouteScreen;

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
    tipContainer: {
        flexDirection: 'row',
        marginTop: 24,
        backgroundColor: '#FEF2F2',
        borderRadius: 12,
        overflow: 'hidden',
    },
    tipBorder: {
        width: 4,
        backgroundColor: '#DC2626',
    },
    tipContent: {
        flex: 1,
        padding: 16,
    },
    tipText: {
        fontSize: 14,
        color: '#991B1B',
        lineHeight: 20,
    },
    tipEmoji: {
        fontSize: 14,
    },
    tipBold: {
        fontWeight: '600',
    },
})