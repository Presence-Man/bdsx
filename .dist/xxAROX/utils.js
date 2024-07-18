"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDuration = parseDuration;
function parseDuration(input) {
    const components = input.split(/\s*,\s*/);
    let totalMillis = 0;
    for (const component of components) {
        const [value, unit] = component.split(/\s+/);
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue)) {
            switch (unit) {
                case "year":
                case "years":
                case "y":
                    totalMillis += numericValue * 365 * 24 * 60 * 60 * 1000;
                    break;
                case "month":
                case "months":
                case "mo":
                    totalMillis += numericValue * 30 * 24 * 60 * 60 * 1000;
                    break;
                case "week":
                case "weeks":
                case "w":
                    totalMillis += numericValue * 7 * 24 * 60 * 60 * 1000;
                    break;
                case "day":
                case "days":
                case "d":
                    totalMillis += numericValue * 24 * 60 * 60 * 1000;
                    break;
                case "hour":
                case "hours":
                case "h":
                    totalMillis += numericValue * 60 * 60 * 1000;
                    break;
                case "minute":
                case "minutes":
                case "min":
                case "s":
                    totalMillis += numericValue * 60 * 1000;
                    break;
                case "second":
                case "seconds":
                case "sec":
                    totalMillis += numericValue * 1000;
                    break;
                default:
                    throw `Invalid unit: ${unit}`;
            }
        }
        else {
            throw `Invalid numeric value: ${value}`;
        }
    }
    return totalMillis;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMveHhBUk9YL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsc0NBdURDO0FBdkRELFNBQWdCLGFBQWEsQ0FBQyxLQUFhO0lBQzFDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBRXBCLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1lBQzFCLFFBQVEsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxHQUFHO29CQUNQLFdBQVcsSUFBSSxZQUFZLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztvQkFDeEQsTUFBTTtnQkFDUCxLQUFLLE9BQU8sQ0FBQztnQkFDYixLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLElBQUk7b0JBQ1IsV0FBVyxJQUFJLFlBQVksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO29CQUN2RCxNQUFNO2dCQUNQLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssT0FBTyxDQUFDO2dCQUNiLEtBQUssR0FBRztvQkFDUCxXQUFXLElBQUksWUFBWSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7b0JBQ3RELE1BQU07Z0JBQ1AsS0FBSyxLQUFLLENBQUM7Z0JBQ1gsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxHQUFHO29CQUNQLFdBQVcsSUFBSSxZQUFZLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO29CQUNsRCxNQUFNO2dCQUNQLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssT0FBTyxDQUFDO2dCQUNiLEtBQUssR0FBRztvQkFDUCxXQUFXLElBQUksWUFBWSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO29CQUM3QyxNQUFNO2dCQUNQLEtBQUssUUFBUSxDQUFDO2dCQUNkLEtBQUssU0FBUyxDQUFDO2dCQUNmLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssR0FBRztvQkFDUCxXQUFXLElBQUksWUFBWSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7b0JBQ3hDLE1BQU07Z0JBQ1AsS0FBSyxRQUFRLENBQUM7Z0JBQ2QsS0FBSyxTQUFTLENBQUM7Z0JBQ2YsS0FBSyxLQUFLO29CQUNULFdBQVcsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUNuQyxNQUFNO2dCQUNQO29CQUNDLE1BQU0saUJBQWlCLElBQUksRUFBRSxDQUFDO1lBQ2hDLENBQUM7UUFDRixDQUFDO2FBQU0sQ0FBQztZQUNQLE1BQU0sMEJBQTBCLEtBQUssRUFBRSxDQUFDO1FBQ3pDLENBQUM7SUFDRixDQUFDO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDcEIsQ0FBQyJ9