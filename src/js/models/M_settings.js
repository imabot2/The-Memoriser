
class M_Settings {

  /**
   * Constructor, initialize default settings
   */
  constructor() {
    this.data = {
      // Beta belongs to [0 10]
      // 0 = random questions
      // 10 = questions least well answered very frequently
      beta : 10,

      // Timer mode [up | down]
      timerMode: "down",
      timerValue: 30,      
    }
  }


}

export default new M_Settings();