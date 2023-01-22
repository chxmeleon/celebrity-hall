import { RuleTable } from '@/components/common/ruleInfo'
import { clsx as cx } from 'clsx'
import { ruleContext } from '@/libs/ruleContext'

const Rule = () => {
  const mainStyle = cx(
    'w-4/5 h-full pt-24 px-12',
    '[&_p]:leading-9 [&_p]:text-sm',
    '[&_.game-alert]:text-rose-500 [&_.game-alert]:py-10',
    '[&_.game-info>h2]:text-teal-300 [&_.game-info]:py-10',
    '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:my-3',
    '[&_ol]:list-decimal [&_ol]:ml-11 ',
    '[&_.waring-note]:text-rose-500 [&_.waring-note]:font-thin'
  )

  return (
    <section className="flex overflow-y-scroll justify-center items-center w-full h-full bg-theme-50/50">
      <div className={mainStyle}>
        <div className="text-2xl text-center text-amber-400">
          <h1>百家樂【Baccarat】</h1>
        </div>
        <div className="py-5">
          <p>
            <strong>百家樂【Baccarat】</strong>{' '}
            是撲克遊戲，亦是賭場中常見的遊戲之一。百家樂源於意大利，十五世紀時期傳入法國，及至十九世紀時盛傳於英法等地。時至今日，百家樂是世界各地賭場中受歡迎的遊戲之一。於澳門的賭場中，百家樂賭桌的數目更是全球賭場之中最多。
            百家樂特別之處在於採用先發牌後下注玩法，玩家可於荷官發牌後，選擇欲下注方位進行投注，遊戲過程中更具公平、公正性。
          </p>
        </div>
        <div className="game-info">
          <h2>● 百家樂遊戲玩法</h2>
          <p>
            每局開始荷官會按百家牌例發牌（牌面朝下），「閒家」「莊家」各先派兩張牌，以「閒家」先發，再發2張牌放在補牌區的位置上，如前兩張未分出勝負需再按「牌例」發第三張的牌，最多每方3張牌，誰最接近9點即為勝方，相同點數即和局。如當局只補一張牌，剩餘的牌將作為下一局閒家第一張使用。以此類推，每新開一局，桌面上保持有6張牌在相對應的位置上。
          </p>
          <p className="waring-note">
            ※ 遊戲左下方可切換單人/多人投注模式,
            帶領玩家體驗不同遊戲介面跟投注方位。
          </p>
        </div>
        <div className="game-info">
          <h2>● 遊戲規則</h2>
          <p>
            發牌員會派出【莊家】和【閒家】兩份牌，總得9點或最接近9點的一家勝出。
          </p>
          <p>所有從2到9的牌，其數值就是他們顯示的點數：</p>
          <p>
            A當作是1點，K、Q、J、10是0點，而加起來等於10的也當作是0點；當任何一家頭兩張牌的點數總和為8或9，就稱為【天生贏家】。任何一家拿到【天生贏家】，牌局就算結束，不再補牌。9最大，0最小；點數相同則為和。派出兩張牌後，如果需要補牌，將依照補牌規則多發一張牌。
          </p>
          <h3 className="pt-3 pb-2 font-medium text-rose-500 text-[17px]">
            標準百家樂遊戲方法
          </h3>
          <p>
            遊戲大廳進入真人百家樂默認免水百家樂模式，此時可通過標準百家樂按鈕切換至標準百家樂遊戲；在標準百家樂遊戲也可通過免水百家樂按鈕切換回免水百家樂遊戲。未下注時，可以隨時做切換，選擇標準百家樂或免水百家樂進行投注。有下注時，要取消下注或者下注結算完畢才能進行互相切換。
          </p>
        </div>
        <div className="game-info">
          <h2>● 補牌規則</h2>
          <div className="overflow-x-auto py-5 w-full min-w-lg">
            <RuleTable data={ruleContext?.table1} rows={11} cols={7} span={3} />
          </div>
          <p className="waring-note">
            ※
            若莊閒兩家（頭兩張牌）為6點或7點，即定輸贏（如雙方同為6點或7點，即為和局）。
          </p>
          <p className="waring-note">
            ※ 莊家補牌備註：閒家第三張牌，意指閒家第三張牌牌面，並非三張牌總計。
          </p>
        </div>
        <div className="game-info">
          <h2>● 標準/免水百家樂賠率表</h2>
          <p className="waring-note">
            標準/免水百家樂下注選擇：莊贏、閒贏、和局、莊對、閒對、莊龍寶、閒龍寶、莊例牌、閒例牌、任意一對、完美對子、莊單、莊雙、閒單、閒雙、大、小、Super
            6、超和
          </p>
          <div className="overflow-x-auto py-5 w-full min-w-lg">
            <RuleTable data={ruleContext?.table2} rows={21} cols={6} span={3} />
          </div>
          <p className="waring-note">
            ● 投注《閒/莊例牌》例牌和局時，退還本金;
            非例牌和局時，則為輸掉本金。
          </p>
          <p className="waring-note">
            ●
            投注《任意一對或完美對子》若莊家和閒家開牌結果同時為任意一對或完美對子，只會按照該方位的賠率而派彩一次，不會因為同時間莊/閒都開出，而雙倍派彩。
          </p>
          <p className="waring-note">
            ●
            大/小、閒單/閒雙、莊單/莊雙、超和，30局以上（不含30局）押注框將反黑，無法進行投注。
          </p>
          <p className="waring-note">
            ●
            大/小、閒單/閒雙、莊單/莊雙上下限與方位閒/莊一樣；閒龍寶/莊龍寶上下限與方位和一樣。
          </p>
        </div>

        <div className="game-info">
          <h2>● 免水百家樂規則</h2>
          <p>免水百家樂的玩法及規則與標準百家樂大致相同，特別之處在於莊家免抽水，即莊贏賠率為1：1(莊家以6點大過閒家，下注莊家贏，賠率1賠0.5)。</p>
        </div>
        <div className="game-info">
          <h2>● 超和遊戲玩法</h2>
          <p>押注和局開出的點數，不同點數對應不同賠率(押中和局開出的點數予以派彩)</p>
          <div className="overflow-x-auto py-5 w-full min-w-lg">
            <RuleTable data={ruleContext?.table1} rows={11} cols={7} span={3} />
          </div>
        </div>
        <div className="game-alert">
          <h2>● 請注意！！（勾選不使用確認投注鍵進行投注）</h2>
          <ol>
            <li>
              <p>
                您在視訊遊戲中，可同時投注其他遊戲，或提款、轉賬到其他平台。投注時間結束時，會判斷當前剩餘額度是否足夠投注，若不夠，則下注不成功。
              </p>
            </li>
            <li>
              <p>
                若您剩餘額度只有200，先投注百家樂200點，後投注瞇牌百家樂200點，瞇牌百家樂投注時間先結束，則瞇牌百家樂會投注成功，百家樂投注不成功。
              </p>
            </li>
          </ol>
        </div>
        <div className="game-info">
          <h2>● 遊戲狀況規範</h2>
          <ol>
            <li>
              <p>
                遊戲中如遇本網站網路不穩造成瞬斷或視訊畫面延遲時，玩家可以選擇停止下注或退出遊戲重新登入，如已下注之注單仍視為有效。
              </p>
            </li>
            <li>
              <p>
                遊戲中荷官不慎同時抽出兩張牌，無論掃描與否，荷官都將依正確順序掃描後繼續運行，該局所下注單視為有效。
              </p>
            </li>
            <li>
              <p>
                遊戲中如遇牌型掃描錯誤，或荷官發牌順序錯誤，荷官將立即更正為正確牌型及放牌位置，若荷官無即時發現更正，玩家可選擇是否進行投注，該局所下注單視為有效。
              </p>
            </li>
            <li>
              <p>
                遊戲中若荷官於下注完畢之前，不慎先開牌，無論幾張，該局所下注單視為無效，並結束當靴開始新局。
              </p>
            </li>
            <li>
              <p>
                遊戲中荷官不慎多抽牌(已不需發牌，荷官仍發牌時)，多發的牌若未翻開，該張牌將做為下一局第一張牌，該局所下注單視為有效。
              </p>
            </li>
            <li>
              <p>
                遊戲中如因牌型掃描錯誤或荷官失誤致使以錯誤結果計算時，本網將以正確結果重新計算。
              </p>
            </li>
            <li>
              <p>
                遊戲中因本網站網路、現場設備等，造成遊戲中斷，請您稍候，待恢復後將繼續未完成牌局，該局所下注單視為有效。
              </p>
            </li>
            <li>
              <p>
                本娛樂城所提供之牌路僅供參考，若因國際線路問題或其他因素造成牌路顯示有誤，所有遊戲結果將以視訊開牌及遊戲記錄為主。
              </p>
            </li>
            <li>
              <p>
                遊戲中因遊戲程序出現異常造成遊戲無法繼續時，已開牌之牌局為有效注單，將繼續完成本局，本網將以視訊結果手動計算，而未開牌之牌局將視為無效，不予計算，所有程序將被關閉，並重開程序，開始新局，並公佈該局錄像，以示公正。
              </p>
            </li>
            <li>
              <p>本娛樂城保留一切有爭議事項的修正及最後的決策。</p>
            </li>
            <li>
              <p>
                本娛樂城保留隨時修訂、撤銷或中止任何投注的權力而無須作事先通知，亦無須作任何解釋。
              </p>
            </li>
            <li>
              <p>
                本娛樂城記錄每一項於本網站伺服器內執行的交易及投注功能。若會員提供的資料與本網站資料庫中的資料記錄之間出現了任何聲稱的差異，一切均以本網站資料庫的資料為準。
              </p>
            </li>
            <li>
              <p>
                惡意使用外掛程序以不正當方式取得之點數，所有點數將不予以計算。
              </p>
            </li>
            <li>
              <p>
                會員最多可申請1 個帳號投注，若超過1
                個以上的帳號投注同場牌局，本公司將保留最終的注單審核及刪除權力。
              </p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Rule
