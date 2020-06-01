import { Notifications } from "expo";
const getLocalNotificationObject = () => ({
  title: "Your cards are missing you!",
  body: "Open a quizz and do more practise",
  sound: true,
  _displayInForeground: true,
  icon:
    "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/playing_cards_deck.png",
  sticky: false,
});
// will be called whenever user starts a quiz to prepare a notification for the next day
export const clearNotificationsAndSetOneForTomorrow = () => {
  Notifications.cancelAllScheduledNotificationsAsync().then(() => {
    let today = new Date();
    today.setHours(20); //8 pm
    // add a day
    let tomorrow = today.setTime(today.getTime() + 1000 * 60 * 60 * 24);
    Notifications.scheduleLocalNotificationAsync(getLocalNotificationObject(), {
      repeat: "day",
      time: tomorrow,
    });
  });
};
