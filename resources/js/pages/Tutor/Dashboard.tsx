import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/tutor/dashboard',
    },
];

// Setup the localizer with moment
const localizer = momentLocalizer(moment);

// Events come from server via Inertia props (falls back to empty array)
export default function Dashboard({ events: serverEvents }: { events?: any[] }) {
    const serverEventsArray = serverEvents ?? [];

    const events = serverEventsArray.map((ev) => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end),
    }));

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

    const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        console.log('Selected slot:', start, end);

    };

    const handleSelectEvent = (event: any) => {
        setSelectedEvent(event);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="m-4">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Your Booking Schedule
                </h1>
                <p className="text-sm text-gray-500">
                    View your confirmed and paid tutoring sessions.
                </p>
            </div>
            <div className="flex flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="h-150 w-full rounded-xl bg-white p-4 shadow-md">
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
                        date={currentDate}
                        onNavigate={(date: Date) => setCurrentDate(date)}
                        eventPropGetter={(event: any) => {
                            // Custom event styling based on tutor_status
                            let backgroundColor = '#6b7280'; // default gray

                            if (event.tutor_status === 'success') {
                                backgroundColor = '#22c55e'; // green
                            } else if (event.tutor_status === 'failed') {
                                backgroundColor = '#ef4444'; // red
                            } else if (event.tutor_status === 'accept') {
                                backgroundColor = '#3b82f6'; // blue
                            }

                            return {
                                style: {
                                    backgroundColor,
                                    borderRadius: '4px',
                                    color: 'white',
                                    border: 'none',
                                    padding: '2px 8px',
                                    width: '100%',
                                },
                            };
                        }}
                        titleAccessor={(event: any) => event.title || event.name}
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
                            showMore: (count: number) => `+${count} more`,
                        }}
                    />
                </div>
            </div>

            <AlertDialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='mb-4'>
                            Schedule with {selectedEvent?.title || selectedEvent?.name}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            <div>
                                <strong>Start:</strong>{' '}
                                {selectedEvent && moment(selectedEvent.start).format('MMMM D, YYYY h:mm A')}
                            </div>
                            <div>
                                <strong>End:</strong>{' '}
                                {selectedEvent && moment(selectedEvent.end).format('MMMM D, YYYY h:mm A')}
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedEvent(null)}>
                            Close
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
