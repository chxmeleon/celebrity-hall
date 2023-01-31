import { RuleTable } from '@/components/common/ruleInfo'
import { clsx as cx } from 'clsx'
import { ruleContext } from '@/libs/ruleContext'
import Card_h_4 from '/cards/17.webp'
import Card_d_4 from '/cards/30.webp'
import Card_s_7 from '/cards/7.webp'
import Card_s_1 from '/cards/1.webp'
import Card_c_8 from '/cards/47.webp'
import Card_c_7 from '/cards/46.webp'
import Card_h_7 from '/cards/20.webp'
import Card_c_4 from '/cards/43.webp'
import Card_s_4 from '/cards/4.webp'
import Card_h_k from '/cards/26.webp'
import Card_h_6 from '/cards/19.webp'
import Card_h_5 from '/cards/18.webp'
import Card_d_j from '/cards/37.webp'
import Card_d_5 from '/cards/31.webp'
import Card_h_2 from '/cards/15.webp'
import Card_d_2 from '/cards/28.webp'
import Card_d_3 from '/cards/29.webp'

const Rule = () => {
  const mainStyle = cx(
    ' w-full md:w-4/5 h-full pt-24 px-7 md:px-12',
    '[&_p]:leading-9',
    '[&_.game-alert]:text-rose-500 [&_.game-alert]:py-10',
    '[&_.game-info>h2]:text-teal-300 [&_.game-info]:py-10',
    '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:my-3',
    '[&_ol]:list-decimal [&_ol]:ml-11 ',
    '[&_.warning-note]:text-rose-500'
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
          <p className="warning-note">
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
          <div className="overflow-x-auto py-5 w-full">
            <RuleTable data={ruleContext?.table1} rows={11} cols={7} span={3} />
          </div>
          <p className="warning-note">
            ※
            若莊閒兩家（頭兩張牌）為6點或7點，即定輸贏（如雙方同為6點或7點，即為和局）。
          </p>
          <p className="warning-note">
            ※ 莊家補牌備註：閒家第三張牌，意指閒家第三張牌牌面，並非三張牌總計。
          </p>
        </div>
        <div className="game-info">
          <h2>● 標準/免水百家樂賠率表</h2>
          <p className="warning-note">
            標準/免水百家樂下注選擇：莊贏、閒贏、和局、莊對、閒對、莊龍寶、閒龍寶、莊例牌、閒例牌、任意一對、完美對子、莊單、莊雙、閒單、閒雙、大、小、Super
            6、超和
          </p>
          <div className="overflow-x-auto py-5 w-full">
            <RuleTable data={ruleContext?.table2} rows={21} cols={6} span={3} />
          </div>
          <p className="warning-note">
            ● 投注《閒/莊例牌》例牌和局時，退還本金;
            非例牌和局時，則為輸掉本金。
          </p>
          <p className="warning-note">
            ●
            投注《任意一對或完美對子》若莊家和閒家開牌結果同時為任意一對或完美對子，只會按照該方位的賠率而派彩一次，不會因為同時間莊/閒都開出，而雙倍派彩。
          </p>
          <p className="warning-note">
            ●
            大/小、閒單/閒雙、莊單/莊雙、超和，30局以上（不含30局）押注框將反黑，無法進行投注。
          </p>
          <p className="warning-note">
            ●
            大/小、閒單/閒雙、莊單/莊雙上下限與方位閒/莊一樣；閒龍寶/莊龍寶上下限與方位和一樣。
          </p>
        </div>

        <div className="game-info">
          <h2>● 免水百家樂規則</h2>
          <p>
            免水百家樂的玩法及規則與標準百家樂大致相同，特別之處在於莊家免抽水，即莊贏賠率為1：1(莊家以6點大過閒家，下注莊家贏，賠率1賠0.5)。
          </p>
        </div>

        <div className="game-info">
          <h2>● 超和遊戲玩法</h2>
          <p>
            押注和局開出的點數，不同點數對應不同賠率(押中和局開出的點數予以派彩)
          </p>
          <div className="overflow-x-auto py-5 w-full">
            <RuleTable data={ruleContext?.table3} rows={11} cols={6} span={4} />
          </div>
        </div>

        <div className="game-info">
          <h2>● 閒龍寶/莊龍寶規則</h2>
          <p>
            在基礎百家樂遊戲發牌的規則下，如玩家於莊龍寶或閒龍寶進行投注，會根據不同的勝出情況再額外進行派彩，且亦可投注莊家或閒家。龍寶會根據所投註一方勝出對方點數的情況，賠率會有所不同，最高彩金為30倍，且所贏得彩金不抽水。若投注其中一方獲勝，並且符合下列兩種之一即可獲得派彩；
          </p>
          <ol>
            <li>所投注之勝方以非例牌勝出，且超過對方四點以上。</li>
            <li>所投注之勝方兩張牌相加為八點或九點(例牌)，可獲得一倍彩金。</li>
            <li>
              所投注落敗或平手或勝差於三點以下時，即喪失所押注彩金，但若雙方皆為八點或九點(例牌)且雙方平手時，則可取回所投注彩金。
            </li>
          </ol>
          <p className="warning-note">非例牌:</p>
          <ol>
            <li>頭兩張牌點數總和7點(含7點)以下皆屬非例牌。</li>
            <li>所有三張牌的情況亦屬非例牌。</li>
          </ol>
          <p className="warning-note">例牌:</p>
          <ol>
            <li>頭兩張牌的點數總和為8或9點。</li>
          </ol>
        </div>

        <div className="game-info">
          <h2>● 閒龍寶/莊龍寶賠率表</h2>
          <div className="overflow-x-auto py-5 w-full">
            <RuleTable data={ruleContext?.table4} rows={9} cols={2} span={0} />
          </div>
          <div className="w-full min-w-fit">
            <p className="pt-1 pb-5">比牌舉例說明：</p>
            <div className="inline-flex justify-between items-center w-1/2">
              <p>閒家9點</p>
              <span className="inline-flex justify-around w-1/3">
                <img src={Card_h_4} alt="pocker card image" className="w-11" />
                <img src={Card_c_8} alt="pocker card image" className="w-11" />
                <img src={Card_c_7} alt="pocker card image" className="w-11" />
              </span>
              <p>莊家5點</p>
              <span className="inline-flex justify-around w-1/3">
                <img src={Card_h_7} alt="pocker card image" className="w-11" />
                <img src={Card_c_4} alt="pocker card image" className="w-11" />
                <img src={Card_s_4} alt="pocker card image" className="w-11" />
              </span>
            </div>
            <p className="pt-1 pb-4">
              ● 閒贏，投注《閒龍寶》勝方以
              <span className="warning-note">(非例牌)</span>
              贏4點，則派彩【1賠1】。
            </p>
            <div className="inline-flex justify-between items-center w-1/2">
              <p>閒家6點</p>
              <span className="inline-flex w-1/3">
                <img src={Card_h_k} alt="pocker card image" className="w-11" />
                <div className="pl-1">
                  <img
                    src={Card_h_6}
                    alt="pocker card image"
                    className="w-11"
                  />
                </div>
              </span>
              <p>莊家9點</p>
              <span className="inline-flex justify-around w-1/3">
                <img src={Card_h_7} alt="pocker card image" className="w-11" />
                <img src={Card_d_j} alt="pocker card image" className="w-11" />
                <img src={Card_c_4} alt="pocker card image" className="w-11" />
              </span>
            </div>
            <p className="pt-1 pb-4">
              ● 莊贏，投注《莊龍寶》投注方以
              <span className="warning-note">(非例牌)</span>
              贏3點以下則輸掉投注金。
            </p>
            <div className="inline-flex justify-between items-center w-1/2">
              <p>閒家9點</p>
              <span className="inline-flex w-1/3">
                <img src={Card_h_5} alt="pocker card image" className="w-11" />
                <div className="pl-1">
                  <img
                    src={Card_d_4}
                    alt="pocker card image"
                    className="w-11"
                  />
                </div>
              </span>
              <p>莊家8點</p>
              <span className="inline-flex w-1/3">
                <img src={Card_s_7} alt="pocker card image" className="w-11" />
                <div className="pl-1">
                  <img
                    src={Card_s_1}
                    alt="pocker card image"
                    className="w-11"
                  />
                </div>
              </span>
            </div>
            <p className="pt-1 pb-4">
              ● 閒贏，投注《閒龍寶》勝方以
              <span className="warning-note">(例牌)</span>勝出，則派彩【1賠1】。
            </p>
            <div className="inline-flex justify-between items-center w-1/2">
              <p>閒家7點</p>
              <span className="inline-flex w-1/3">
                <img src={Card_d_5} alt="pocker card image" className="w-11" />
                <div className="pl-1">
                  <img
                    src={Card_h_2}
                    alt="pocker card image"
                    className="w-11"
                  />
                </div>
              </span>
              <p>莊家7點</p>
              <span className="inline-flex justify-around w-1/3">
                <img src={Card_c_8} alt="pocker card image" className="w-11" />
                <img src={Card_d_2} alt="pocker card image" className="w-11" />
                <img src={Card_h_7} alt="pocker card image" className="w-11" />
              </span>
            </div>
            <p className="pt-1 pb-4">
              ● 和局，投注《閒/莊龍寶》投注方以{' '}
              <span className="warning-note">(非例牌)</span>和局，則輸掉投注金。
            </p>
            <div className="inline-flex justify-between items-center w-1/2">
              <p>閒家8點</p>
              <span className="inline-flex w-1/3">
                <img src={Card_h_5} alt="pocker card image" className="w-11" />
                <div className="pl-1">
                  <img
                    src={Card_d_3}
                    alt="pocker card image"
                    className="w-11"
                  />
                </div>
              </span>
              <p>莊家8點</p>
              <span className="inline-flex w-1/3">
                <img src={Card_h_6} alt="pocker card image" className="w-11" />
                <div className="pl-1">
                  <img
                    src={Card_h_2}
                    alt="pocker card image"
                    className="w-11"
                  />
                </div>
              </span>
            </div>
            <p className="pt-1 pb-4">
              ● 和局，投注《閒/莊龍寶》投注方以
              <span className="warning-note">(例牌)</span>和局，則退回投注金。
            </p>
          </div>
        </div>
        <div className="game-info">
          <h2>● 牌路介紹</h2>
          <p>
            簡介：所謂百家樂的「路」，是指百家樂開牌結果的記錄。
            通過看前面的牌路，來判斷後面的開牌結果，從而決定下一手下注在莊還是閒，這是大多數百家樂玩家最常用的參考方法。70年代葡京娛樂場的初期，發明了小路。不久之後，70年代中期，葡京娛樂場的荷官於小路發現出了一條新路，發明的新路就取名為&quot大眼路&quot;。之後，有人在大眼路和小路的基礎上，發明了&quot;小強路&quot;。
          </p>
          <div className="py-4 w-full">
            <img
              src="/rule/roadbigA.jpeg"
              alt="rule image"
              className="w-full"
            />
          </div>
          <p className="py-2">
            一、開牌結果的記錄<br />
            左上角的紅點標示表示出現了莊對，右下角的藍點標示表示出現了閒對，如果同時出現莊對閒對，則會在左上角和右下角標示紅點和藍點，例牌勝出為實心圓，非例牌勝出則為空心圓。
          </p>
          <p className="py-2">
            二、大路 <br />
            最常用的路，&quot;大路&quot;就是把每一次開牌的結果記錄下來，開[莊]，用紅色表示，而開[閒]則用藍色來表示。按照[莊]、[閒]出現的順序，&quot;大路&quot;中標示為[莊]一列，[閒]一列，[莊]、[閒]交錯分佈，紅色代表莊贏，藍色代表閒贏。左上角的紅點標示表示出現莊對，右下角的藍點標示表示出現閒對，如果同時出現莊對和閒對，則同時在左上角和右下角標示紅點和藍點。如果開[和]的話，則用綠色X在開獎結果中表示，如莊家為【Super
            6】則在開獎結果中，於紅圈中加上數字6表示。
          </p>
          <p className="py-2">
            三、大眼路<br />
            根據牌路&quot;大路&quot;延伸出&quot;大眼路&quot;的牌路單。起始標示的參照點是從&quot;大路&quot;的牌路之第2列第2行開始，如果&quot;大路&quot;的牌路該座標上沒有出現[莊]或[閒]，則以第3列第1行開始作為參照點。
          </p>
          <p>如下圖：</p>
          <div className="py-4 w-1/3">
            <img
              src="/rule/roadbigex1.jpeg"
              alt="rule image"
              className="w-full"
            />
          </div>
          <p className="warning-note">
            (優先以座標01為參考點，若座標01無莊或閒，則以座標02為參考點。)
          </p>
        </div>
        <div className="game-info">
          <h2>● 大眼路寫法畫藍圈規則</h2>
          <div className="flex gap-4 justify-start w-full h-80">
            <div className="w-1/3 h-full">
              <p className="pb-2">1.直落：</p>
              <div>
                <img
                  src="/rule/roadbigblue1.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前一列，前一列無結果大眼路畫藍圈。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <p className="pb-2">2.換列：</p>
              <div>
                <img
                  src="/rule/roadbigblue2.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，比對前一列與前二列是否齊整，不齊整則大眼路畫藍圈。)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="game-info">
          <h2>● 大眼路寫法畫紅圈規則</h2>
          <div className="flex gap-4 justify-between items-center w-full h-80">
            <div className="w-1/3 h-full">
              <p className="pb-2">1.直落：</p>
              <div>
                <img
                  src="/rule/roadbigred1.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前一列，前一列不論結果為莊或閒，則大眼路畫紅圈。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <div className="h-11"></div>
              <div>
                <img
                  src="/rule/roadbigred2.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前一列，前一列若二行或二行以上無結果，則大眼路畫紅圈。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <p className="pb-2">2.換列：</p>
              <div>
                <img
                  src="/rule/roadbigred3.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，比對前一列與前二列是否齊整，二列齊整則大眼路畫紅圈。)
                </span>
              </div>
            </div>
          </div>
          <p>
            四、小路<br />
            根據牌路&quot;大路&quot;延伸出&quot;小路&quot;的牌路單。起始標示的參照點是從&quot;大路&quot;的牌路單第三列第2行開始，如果&quot;大路&quot;的牌路該座標上沒有出現[莊]或[閒]，則以第四列第1行開始作為參照點。
          </p>
          <p>如下圖：</p>
          <div className="py-4 w-1/3">
            <img
              src="/rule/roadsmallex1.jpeg"
              alt="rule image"
              className="w-full"
            />
          </div>
          <p className="warning-note">
            (優先以座標01為參照點，若座標01無莊或閒，則以座標02為參照點。)
          </p>
        </div>
        <div className="game-info">
          <h2>● 小路寫法畫藍圈規則</h2>
          <div className="flex gap-4 justify-start w-full h-80">
            <div className="w-1/3 h-full">
              <p className="pb-2">1.直落：</p>
              <div>
                <img
                  src="/rule/roadsmallblue1.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前二列，前二列無結果，則小路畫藍圈。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <p className="pb-2">2.換列：</p>
              <div>
                <img
                  src="/rule/roadsmallblue2.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，比對前一列與前三列是否齊整，不齊整則小路畫藍圈。)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="game-info">
          <h2>● 小路寫法畫紅圈規則</h2>
          <div className="flex gap-4 justify-between items-center w-full h-80">
            <div className="w-1/3 h-full">
              <p className="pb-2">1.直落：</p>
              <div>
                <img
                  src="/rule/roadsmallred1.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前二列，前二列不論結果為莊或閒，則小路畫紅圈。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <div className="h-11"></div>
              <div>
                <img
                  src="/rule/roadsmallred2.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前二列，前二列若二行或二行以上無結果，則小路畫紅圈。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <p className="pb-2">2.換列：</p>
              <div>
                <img
                  src="/rule/roadsmallred3.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，比對前一列與前三列是否齊整，二列齊整則小路畫紅圈。)
                </span>
              </div>
            </div>
          </div>
          <p>
            五、小強路<br />
            根據牌路&quot;大路&quot;延伸出&quot;小強路&quot;的牌路單。起始標示的參照點是從&quot;大路&quot;的牌路單第四列第2行開始，如果&quot;大路&quot;的牌路該座標上沒有出現[莊]或[閒]，則以第五列第1行開始作為參照點。
          </p>
          <p>如下圖：</p>
          <div className="py-4 w-1/3">
            <img src="/rule/roadex3.jpeg" alt="rule image" className="w-full" />
          </div>
          <p className="warning-note">
            (優先以座標01為參照點，若座標01無莊或閒，則以座標02為參照點。)
          </p>
        </div>
        <div className="game-info">
          <h2>● 小強路畫藍色斜線規則</h2>
          <div className="flex gap-4 justify-start w-full h-80">
            <div className="w-1/3 h-full">
              <p className="pb-2">1.直落：</p>
              <div>
                <img
                  src="/rule/roadstblue1.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前三列，前三列無結果，則小強路畫藍色斜線。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <p className="pb-2">2.換列：</p>
              <div>
                <img
                  src="/rule/roadstblue2.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，比對前一列與前四列是否齊整，不齊整則小強路畫藍色斜線。)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="game-info">
          <h2>● 小強路畫紅色斜線規則</h2>
          <div className="flex gap-4 justify-between items-center w-full h-80">
            <div className="w-1/3 h-full">
              <p className="pb-2">1.直落：</p>
              <div>
                <img
                  src="/rule/roadstred1.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前三列，前三列不論結果為莊或閒，則小強路畫紅色斜線。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <div className="h-11"></div>
              <div>
                <img
                  src="/rule/roadstred2.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，水平方式比對前三列，前三列若二行或二行以上無結果，則小強路畫紅色斜線。)
                </span>
              </div>
            </div>
            <div className="w-1/3 h-full">
              <p className="pb-2">2.換列：</p>
              <div className="">
                <img
                  src="/rule/roadstred3.jpeg"
                  alt="rule image"
                  className="w-full"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs leading-none">
                  (以大路的最新參照點，比對前一列與前四列是否齊整，二列齊整則小強路畫紅色斜線。)
                </span>
              </div>
            </div>
          </div>
          <p>
            六、莊問路、閒問路
            此功能是用於預測下一局如果開出[閒]或開出[莊]時，大路、大眼路、小路、小強路將會如何延展。方便玩家能更快速的判斷該如何投注下一局。
          </p>
          <p>如下圖：</p>
          <div className="w-full">
            <img
              src="/rule/roadbigB.jpeg"
              alt="rule image"
              className="w-full"
            />
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
