import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Book } from 'lucide-react';
import StatusCard from '../Components/StatusCard';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/tutor/dashboard',
    },
];

// Setup the localizer with moment
const localizer = momentLocalizer(moment);

// Example events data
const events = [
    {
        title: 'Math Tutoring - John Doe',
        start: new Date(2026, 0, 25, 10, 0), // Jan 25, 2026, 10:00 AM
        end: new Date(2026, 0, 25, 11, 30),  // Jan 25, 2026, 11:30 AM
        desc: 'Algebra fundamentals',
        resourceId: 1,
    },
    {
        title: 'Physics Session - Jane Smith',
        start: new Date(2026, 0, 26, 14, 0),
        end: new Date(2026, 0, 26, 15, 30),
        desc: 'Newtonian mechanics',
        resourceId: 2,
    },
    {
        title: 'Chemistry Lab - Bob Johnson',
        start: new Date(2026, 0, 27, 9, 0),
        end: new Date(2026, 0, 27, 10, 30),
        desc: 'Chemical reactions',
        resourceId: 3,
    },
];

export default function Dashboard() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        console.log('Selected slot:', start, end);
        // You can open a modal to create a new event here
        // setShowEventModal(true);
        // setSelectedSlot({ start, end });
    };

    const handleSelectEvent = (event: any) => {
        console.log('Selected event:', event);
        // You can open a modal to view/edit the event here
        // setSelectedEvent(event);
        // setShowEventModal(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative h-[12rem] overflow-hidden rounded-xl shadow-md">
                        <StatusCard
                            title="Booking"
                            value="3"
                            description="Total pending booking"
                            icon={<Book />}
                        />
                    </div>
                </div>
                <div className="w-full h-[500px] bg-white rounded-xl shadow-md p-4">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        selectable
                        defaultView="week"
                        views={['month', 'week', 'day', 'agenda']}
                        date={currentDate}
                        onNavigate={(date) => setCurrentDate(date)}
                        eventPropGetter={(event) => {
                            // Custom event styling
                            const backgroundColor =
                                event.resourceId === 1 ? '#3174ad' :
                                event.resourceId === 2 ? '#d1453b' :
                                '#3cb371';

                            return {
                                style: {
                                    backgroundColor,
                                    borderRadius: '4px',
                                    color: 'white',
                                    border: 'none',
                                    padding: '2px 8px',
                                },
                            };
                        }}
                        messages={{
                            today: 'Today',
                            previous: 'Back',
                            next: 'Next',
                            // month: 'Month',
                            // week: 'Week',
                            // day: 'Day',
                            // agenda: 'Agenda',
                            date: 'Date',
                            time: 'Time',
                            event: 'Event',
                            showMore: (count) => `+${count} more`,
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
