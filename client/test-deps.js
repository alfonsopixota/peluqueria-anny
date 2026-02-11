try {
    require('lucide-react');
    console.log('✅ lucide-react is available');
    require('framer-motion');
    console.log('✅ framer-motion is available');
    require('next');
    console.log('✅ next is available');
} catch (e) {
    console.error('❌ Missing dependency:', e.message);
}
