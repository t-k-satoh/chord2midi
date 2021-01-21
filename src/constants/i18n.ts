export const I18N = {
  HOME: {
    INVALID_CHORD: {
      en: 'Invalid chord',
      ja: '不正なコードです',
    } as const,
    OVERFLOW_NOTES: {
      en:
        'There are {{CURRENT_NOTE_LENGTH}} quarter notes in a measure. Since we are currently in {{CURRENT_BEAT}},there can be no more than {{CURRENT_BEAT_LIMIT}} quarter notes in a measure.',
      ja:
        '小節に四分音符が{{CURRENT_NOTE_LENGTH}}つ入っています。現在{{CURRENT_BEAT}}なので四分音符は一小節に{{CURRENT_BEAT_LIMIT}}つまでです。',
      replaceKeys: ['CURRENT_NOTE_LENGTH', 'CURRENT_BEAT', 'CURRENT_BEAT_LIMIT'],
    } as const,
    ERROR_BAR: {
      en: 'Error: {{ERROR_BAR_INDEX}} Bar',
      ja: 'エラー: {{ERROR_BAR_INDEX}}小節目',
      replaceKeys: ['ERROR_BAR_INDEX'],
    } as const,
  },
  SETTINGS: {
    TITLE: {
      ja: '設定',
      en: 'Settings',
    } as const,
    DARK_MODE: {
      ja: 'ダークモード',
      en: 'Dark mode',
    } as const,
  },
  HOW_TO_USE: {
    TITLE: {
      ja: '使い方',
      en: 'How to use',
    } as const,
    CHORD_INPUT: {
      ja: '和音の入力',
      en: 'Chord input',
    } as const,
    INPUT_BOX_DESCRIPTION: {
      ja:
        '画面下の入力ボックスに和音を入力します。<br>和音や小節以外の文字を入力するとエラーになります。',
      en:
        'Enter a chord in the input box at the bottom of the screen.<br>If you enter characters other than chords or measures, an error will occur.',
    } as const,
    BAR: {
      ja: '小節は"|"で区切ります。(前後のスペースは無視されます)',
      en: 'Measures are separated by "|". (Spaces before and after are ignored.)',
    } as const,
    TIME_SIGNATURE: {
      ja:
        '四拍子なら一小節に四分音符を４つ含めることができます。<br>同様に三拍子なら3つ含められます。',
      en:
        'If you are in four time, you can include four quarter notes in a measure.<br>Similarly, if you have three beats, you can include three.',
    } as const,
    UPPER_LIMIT: {
      ja:
        '一小節に含められる上限の四分音符から1を引いた数の和音を入力した場合(四拍子で3つの和音を入力)、最後の和音の長さが自動的に伸びます。<br>下記の例では「C」と「B」がそれぞれ二分音符になっているのがわかります。',
      en:
        'If you enter a number of chords that is equal to the maximum number of quarter notes that can be included in a measure minus one (three chords in four beats), the length of the last chord will be automatically increased.<br>In the example below, you can see that "C" and "B" are each a half note.',
    } as const,
    GENERAL_NOTATION: {
      ja: '和音のコードネームは一般的な記法を入力することができます。',
      en: 'Chord names for chords can be entered in common notation.',
    } as const,
    CHORD_DISPLAY_AREA: {
      ja: '和音表示エリア',
      en: 'Chord display area',
    } as const,
    SHOW_CHORDS: {
      ja: '和音を表示します。<br>タップすると和音の詳細を表示することができます。',
      en: 'Displays chords.<br>Tap to view the details of the chords.',
    } as const,
    LIMIT_CHORDS: {
      ja:
        '上限を超えた小節や不正な和音はエラーになります。<br>同様にタップすると詳細が表示されます。',
      en:
        'Measures that exceed the upper limit or incorrect chords will result in an error.<br>Tap to view the error details.',
    } as const,
    DOWNLOADING_AND_SHARING: {
      ja: 'ダウンロードと共有',
      en: 'Downloading and Sharing',
    } as const,
    MIDI_DOWNLOAD: {
      ja: '画面上部のダウンロードアイコンをクリックするとMIDI データをダウンロードできます。',
      en: 'Click the download icon at the top of the screen to download the MIDI data.',
    } as const,
    INVALID_DATA: {
      ja: '不正なデータがある場合などはクリックできません。',
      en: 'You will not be able to click if there is invalid data, for example.',
    } as const,
    CAN_CLICK_SHARE: {
      ja:
        'また、共有アイコンをクリックすると作成したデータをクリップボードにコピーすることができ、共有できます。入力した時点でエラーに関わらずクリックできます。',
      en:
        'You can also click the share icon to copy the data you have created to the clipboard for sharing. You can click on it regardless of errors as you type.',
    } as const,
    CAN_SHARE: {
      ja: 'コピーされたURL にアクセスすることによって入力されたデータを共有できます。',
      en: 'You can share the input data by accessing the copied URL.',
    } as const,
    CLICK_COPY_BOARD: {
      ja: 'クリップボードにコピーされたURL',
      en: 'The URL copied to the clipboard',
    } as const,
  },
  CONTACT: {},
  SPECIFICATIONS: {},
  UTILS: {
    CLOSE: {
      en: 'Close',
      ja: '閉じる',
    } as const,
    ERROR: {
      en: 'Error',
      ja: 'エラー',
    } as const,
  },
}
