/* JS for All Kendo UI Components English (en-US) Language Pack | Written by IKKI | 2018-02-03 */

/* Cultures ------------------------------ */
(function ( window, undefined ) {
    kendo.cultures["en-US"] = {
        name: "en-US",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "US Dollar",
                abbr: "USD",
                pattern: ["($n)","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                    namesAbbr: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
                    namesShort: ["Su","Mo","Tu","We","Th","Fr","Sa"]
                },
                months: {
                    names: ["January","February","March","April","May","June","July","August","September","October","November","December"],
                    namesAbbr: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM d, yyyy",
                    F: "dddd, MMMM d, yyyy h:mm:ss tt",
                    g: "M/d/yyyy h:mm tt",
                    G: "M/d/yyyy h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    };
})(this);

/* Messages ------------------------------ */
(function ($, undefined) {

    /* Filter messages */
    if (kendo.ui.Filter) {
        kendo.ui.Filter.prototype.options.messages =
            $.extend(true, kendo.ui.Filter.prototype.options.messages, {
                "and": "And",
                "or": "Or",
                "apply": "Apply",
                "close": "Close",
                "addExpression": "Add Expression",
                "addGroup": "Add Group",
                "fields": "Fields",
                "operators": "Operators"
            });
        kendo.ui.Filter.prototype.options.operators =
            $.extend(true, kendo.ui.Filter.prototype.options.operators, {
                "string": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "startswith": "Starts with",
                    "contains": "Contains",
                    "doesnotcontain": "Does not contain",
                    "endswith": "Ends with",
                    "isnull": "Is null",
                    "isnotnull": "Is not null",
                    "isempty": "Is empty",
                    "isnotempty": "Is not empty",
                    "isnullorempty": "Has no value",
                    "isnotnullorempty": "Has value"
                },
                "number": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "gte": "Is greater than or equal to",
                    "gt": "Is greater than",
                    "lte": "Is less than or equal to",
                    "lt": "Is less than",
                    "isnull": "Is null",
                    "isnotnull": "Is not null"
                },
                "date": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "gte": "Is after or equal to",
                    "gt": "Is after",
                    "lte": "Is before or equal to",
                    "lt": "Is before",
                    "isnull": "Is null",
                    "isnotnull": "Is not null"
                },
                "boolean": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to"
                }
            });
    }

    /* FilterMenu messages */
    if (kendo.ui.FilterMenu) {
        kendo.ui.FilterMenu.prototype.options.messages =
            $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
                "info": "Show items with value that:",
                "title": "Show items with value that:",
                "isTrue": "is true",
                "isFalse": "is false",
                "filter": "Filter",
                "clear": "Clear",
                "and": "And",
                "or": "Or",
                "selectValue": "-Select value-",
                "operator": "Operator",
                "value": "Value",
                "additionalValue": "Additional value",
                "additionalOperator": "Additional operator",
                "logic": "Filters logic",
                "cancel": "Cancel",
                "done": "Done",
                "into": "in"
            });
        kendo.ui.FilterMenu.prototype.options.operators =
            $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
                "string": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "startswith": "Starts with",
                    "contains": "Contains",
                    "doesnotcontain": "Does not contain",
                    "endswith": "Ends with",
                    "isnull": "Is null",
                    "isnotnull": "Is not null",
                    "isempty": "Is empty",
                    "isnotempty": "Is not empty",
                    "isnullorempty": "Has no value",
                    "isnotnullorempty": "Has value"
                },
                "number": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "gte": "Is greater than or equal to",
                    "gt": "Is greater than",
                    "lte": "Is less than or equal to",
                    "lt": "Is less than",
                    "isnull": "Is null",
                    "isnotnull": "Is not null"
                },
                "date": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "gte": "Is after or equal to",
                    "gt": "Is after",
                    "lte": "Is before or equal to",
                    "lt": "Is before",
                    "isnull": "Is null",
                    "isnotnull": "Is not null"
                },
                "enums": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "isnull": "Is null",
                    "isnotnull": "Is not null"
                }
            });
    }

    /* FilterCell messages */
    if (kendo.ui.FilterCell) {
        kendo.ui.FilterCell.prototype.options.messages =
            $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
                "isTrue": "is true",
                "isFalse": "is false",
                "filter": "Filter",
                "clear": "Clear",
                "operator": "Operator"
            });
        kendo.ui.FilterCell.prototype.options.operators =
            $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
                "string": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "startswith": "Starts with",
                    "contains": "Contains",
                    "doesnotcontain": "Does not contain",
                    "endswith": "Ends with",
                    "isnull": "Is null",
                    "isnotnull": "Is not null",
                    "isempty": "Is empty",
                    "isnotempty": "Is not empty",
                    "isnullorempty": "Has no value",
                    "isnotnullorempty": "Has value"
                },
                "number": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "gte": "Is greater than or equal to",
                    "gt": "Is greater than",
                    "lte": "Is less than or equal to",
                    "lt": "Is less than",
                    "isnull": "Is null",
                    "isnotnull": "Is not null"
                },
                "date": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "gte": "Is after or equal to",
                    "gt": "Is after",
                    "lte": "Is before or equal to",
                    "lt": "Is before",
                    "isnull": "Is null",
                    "isnotnull": "Is not null"
                },
                "enums": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "isnull": "Is null",
                    "isnotnull": "Is not null"
                }
            });
    }

    /* FilterMultiCheck messages */
    if (kendo.ui.FilterMultiCheck) {
        kendo.ui.FilterMultiCheck.prototype.options.messages =
            $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
                "checkAll": "Select All",
                "clearAll": "Clear All",
                "clear": "Clear",
                "filter": "Filter",
                "search": "Search",
                "cancel": "Cancel",
                "selectedItemsFormat": "{0} items selected",
                "done": "Done",
                "into": "in"
            });
    }

    /* Grid messages */
    if (kendo.ui.Grid) {
        kendo.ui.Grid.prototype.options.messages =
            $.extend(true, kendo.ui.Grid.prototype.options.messages, {
                "commands": {
                    "cancel": "Cancel changes",
                    "canceledit": "Cancel",
                    "create": "Add new record",
                    "destroy": "Delete",
                    "edit": "Edit",
                    "excel": "Export to Excel",
                    "pdf": "Export to PDF",
                    "save": "Save changes",
                    "update": "Update"
                },
                "editable": {
                    "cancelDelete": "Cancel",
                    "confirmation": "Are you sure you want to delete this record?",
                    "confirmDelete": "Delete"
                },
                "search": "Search...",
                "noRecords": "No records available.",
                "expandCollapseColumnHeader": "",
                "groupHeader": "Press ctrl + space to group",
                "ungroupHeader": "Press ctrl + space to ungroup"
            });
        kendo.ui.Grid.prototype.options =
            $.extend(true, kendo.ui.Grid.prototype.options, {
                "noRecords": "No records available."
            });
    }

    /* Groupable messages */
    if (kendo.ui.Groupable) {
        kendo.ui.Groupable.prototype.options.messages =
            $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
                "empty": "Drag a column header and drop it here to group by that column"
            });
    }

    /* ColumnMenu messages */
    if (kendo.ui.ColumnMenu) {
        kendo.ui.ColumnMenu.prototype.options.messages =
            $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
                "sortAscending": "Sort Ascending",
                "sortDescending": "Sort Descending",
                "filter": "Filter",
                "column": "Column",
                "columns": "Columns",
                "columnVisibility": "Column Visibility",
                "clear": "Clear",
                "cancel": "Cancel",
                "done": "Done",
                "settings": "Edit Column Settings",
                "lock": "Lock",
                "unlock": "Unlock"
            });
    }

    /* Pager messages */
    if (kendo.ui.Pager) {
        kendo.ui.Pager.prototype.options.messages =
            $.extend(true, kendo.ui.Pager.prototype.options.messages, {
                "allPages": "All",
                "display": "{0} - {1} of {2} items",
                "empty": "No items to display",
                "page": "Page",
                "of": "of {0}",
                "itemsPerPage": "items per page",
                "first": "Go to the first page",
                "previous": "Go to the previous page",
                "next": "Go to the next page",
                "last": "Go to the last page",
                "refresh": "Refresh",
                "morePages": "More pages"
            });
    }

    /* Spreadsheet messages */
    if (kendo.spreadsheet) {
        if (kendo.spreadsheet.messages.borderPalette) {
            kendo.spreadsheet.messages.borderPalette =
                $.extend(true, kendo.spreadsheet.messages.borderPalette, {
                    "allBorders": "All borders",
                    "insideBorders": "Inside borders",
                    "insideHorizontalBorders": "Inside horizontal borders",
                    "insideVerticalBorders": "Inside vertical borders",
                    "outsideBorders": "Outside borders",
                    "leftBorder": "Left border",
                    "topBorder": "Top border",
                    "rightBorder": "Right border",
                    "bottomBorder": "Bottom border",
                    "noBorders": "No border"
                });
        }
        if (kendo.spreadsheet.messages.colorPicker) {
            kendo.spreadsheet.messages.colorPicker =
                $.extend(true, kendo.spreadsheet.messages.colorPicker, {
                    "reset": "Reset color",
                    "customColor": "Custom color...",
                    "apply": "Apply",
                    "cancel": "Cancel"
                });
        }
        if (kendo.spreadsheet.messages.dialogs) {
            kendo.spreadsheet.messages.dialogs =
                $.extend(true, kendo.spreadsheet.messages.dialogs, {
                    "apply": "Apply",
                    "save": "Save",
                    "cancel": "Cancel",
                    "remove": "Remove",
                    "retry": "Retry",
                    "revert": "Revert",
                    "okText": "OK",
                    "formatCellsDialog": {
                        "title": "Format",
                        "categories": {
                            "number": "Number",
                            "currency": "Currency",
                            "date": "Date"
                        }
                    },
                    "fontFamilyDialog": {
                        "title": "Font"
                    },
                    "fontSizeDialog": {
                        "title": "Font size"
                    },
                    "bordersDialog": {
                        "title": "Borders"
                    },
                    "alignmentDialog": {
                        "title": "Alignment",
                        "buttons": {
                            "justtifyLeft": "Align left",
                            "justifyCenter": "Center",
                            "justifyRight": "Align right",
                            "justifyFull": "Justify",
                            "alignTop": "Align top",
                            "alignMiddle": "Align middle",
                            "alignBottom": "Align bottom"
                        }
                    },
                    "mergeDialog": {
                        "title": "Merge cells",
                        "buttons": {
                            "mergeCells": "Merge all",
                            "mergeHorizontally": "Merge horizontally",
                            "mergeVertically": "Merge vertically",
                            "unmerge": "Unmerge"
                        }
                    },
                    "freezeDialog": {
                        "title": "Freeze panes",
                        "buttons": {
                            "freezePanes": "Freeze panes",
                            "freezeRows": "Freeze rows",
                            "freezeColumns": "Freeze columns",
                            "unfreeze": "Unfreeze panes"
                        }
                    },
                    "confirmationDialog": {
                        "text": "Are you sure you want to remove this sheet?",
                        "title": "Sheet remove"
                    },
                    "validationDialog": {
                        "title": "Data Validation",
                        "hintMessage": "Please enter a valid {0} value {1}.",
                        "hintTitle": "Validation {0}",
                        "criteria": {
                            "any": "Any value",
                            "number": "Number",
                            "text": "Text",
                            "date": "Date",
                            "custom": "Custom Formula",
                            "list": "List"
                        },
                        "comparers": {
                            "greaterThan": "greater than",
                            "lessThan": "less than",
                            "between": "between",
                            "notBetween": "not between",
                            "equalTo": "equal to",
                            "notEqualTo": "not equal to",
                            "greaterThanOrEqualTo": "greater than or equal to",
                            "lessThanOrEqualTo": "less than or equal to"
                        },
                        "comparerMessages": {
                            "greaterThan": "greater than {0}",
                            "lessThan": "less than {0}",
                            "between": "between {0} and {1}",
                            "notBetween": "not between {0} and {1}",
                            "equalTo": "equal to {0}",
                            "notEqualTo": "not equal to {0}",
                            "greaterThanOrEqualTo": "greater than or equal to {0}",
                            "lessThanOrEqualTo": "less than or equal to {0}",
                            "custom": "that satisfies the formula: {0}"
                        },
                        "labels": {
                            "criteria": "Criteria",
                            "comparer": "Comparer",
                            "min": "Min",
                            "max": "Max",
                            "value": "Value",
                            "start": "Start",
                            "end": "End",
                            "onInvalidData": "On invalid data",
                            "rejectInput": "Reject input",
                            "showWarning": "Show warning",
                            "showHint": "Show hint",
                            "hintTitle": "Hint title",
                            "hintMessage": "Hint message",
                            "ignoreBlank": "Ignore blank",
                            "showListButton": "Display button to show list",
                            "showCalendarButton": "Display button to show calendar"
                        },
                        "placeholders": {
                            "typeTitle": "Type title",
                            "typeMessage": "Type message"
                        }
                    },
                    "exportAsDialog": {
                        "title": "Export...",
                        "defaultFileName": "Workbook",
                        "xlsx": {
                            "description": "Excel Workbook (.xlsx)"
                        },
                        "pdf": {
                            "description": "Portable Document Format (.pdf)",
                            "area": {
                                "workbook": "Entire Workbook",
                                "sheet": "Active Sheet",
                                "selection": "Selection"
                            },
                            "paper": {
                                "a2": "A2 (420 mm × 594 mm)",
                                "a3": "A3 (297 mm x 420 mm)",
                                "a4": "A4 (210 mm x 297 mm)",
                                "a5": "A5 (148 mm x 210 mm)",
                                "b3": "B3 (353 mm × 500 mm)",
                                "b4": "B4 (250 mm x 353 mm)",
                                "b5": "B5 (176 mm x 250 mm)",
                                "folio": 'Folio (8.5" x 13")',
                                "legal": 'Legal (8.5" x 14")',
                                "letter": 'Letter (8.5" x 11")',
                                "tabloid": 'Tabloid (11" x 17")',
                                "executive": 'Executive (7.25" x 10.5")'
                            },
                            "margin": {
                                "normal": "Normal",
                                "narrow": "Narrow",
                                "wide": "Wide"
                            }
                        },
                        "labels": {
                            "scale": "Scale",
                            "fit": "Fit to page",
                            "fileName": "File name",
                            "saveAsType": "Save as type",
                            "exportArea": "Export",
                            "paperSize": "Paper size",
                            "margins": "Margins",
                            "orientation": "Orientation",
                            "print": "Print",
                            "guidelines": "Guidelines",
                            "center": "Center",
                            "horizontally": "Horizontally",
                            "vertically": "Vertically"
                        }
                    },
                    "modifyMergedDialog": {
                        "errorMessage": "Cannot change part of a merged cell."
                    },
                    "rangeDisabledDialog": {
                        "errorMessage": "Destination range contains disabled cells."
                    },
                    "intersectsArrayDialog": {
                        "errorMessage": "You cannot alter part of an array"
                    },
                    "incompatibleRangesDialog": {
                        "errorMessage": "Incompatible ranges"
                    },
                    "noFillDirectionDialog": {
                        "errorMessage": "Cannot determine fill direction"
                    },
                    "duplicateSheetNameDialog": {
                        "errorMessage": "Duplicate sheet name"
                    },
                    "overflowDialog": {
                        "errorMessage": "Cannot paste, because the copy area and the paste area are not the same size and shape."
                    },
                    "useKeyboardDialog": {
                        "title": "Copying and pasting",
                        "errorMessage": "These actions cannot be invoked through the menu. Please use the keyboard shortcuts instead:",
                        "labels": {
                            "forCopy": "for copy",
                            "forCut": "for cut",
                            "forPaste": "for paste"
                        }
                    },
                    "unsupportedSelectionDialog": {
                        "errorMessage": "That action cannot be performed on multiple selection."
                    },
                    "linkDialog": {
                        "title": "Hyperlink",
                        "labels": {
                            "text": "Text",
                            "url": "Address",
                            "removeLink": "Remove link"
                        }
                    },
                    "insertCommentDialog": {
                        "title": "Insert comment",
                        "labels": {
                            "comment": "Comment",
                            "removeComment": "Remove comment"
                        }
                    },
                    "insertImageDialog": {
                        "title": "Insert image",
                        "info": "Drag an image here, or click to select",
                        "typeError": "Please select a JPEG, PNG or GIF image"
                    }
                });
        }
        if (kendo.spreadsheet.messages.filterMenu) {
            kendo.spreadsheet.messages.filterMenu =
                $.extend(true, kendo.spreadsheet.messages.filterMenu, {
                    "all": "All",
                    "sortAscending": "Sort range A to Z",
                    "sortDescending": "Sort range Z to A",
                    "filterByValue": "Filter by value",
                    "filterByCondition": "Filter by condition",
                    "apply": "Apply",
                    "search": "Search",
                    "addToCurrent": "Add to current selection",
                    "clear": "Clear",
                    "blanks": "(Blanks)",
                    "operatorNone": "None",
                    "and": "AND",
                    "or": "OR",
                    "operators": {
                        "string": {
                            "contains": "Text contains",
                            "doesnotcontain": "Text does not contain",
                            "startswith": "Text starts with",
                            "endswith": "Text ends with",
                            "matches": "Text matches",
                            "doesnotmatch": "Text does not match"
                        },
                        "date": {
                            "eq":  "Date is",
                            "neq": "Date is not",
                            "lt":  "Date is before",
                            "gt":  "Date is after"
                        },
                        "number": {
                            "eq": "Is equal to",
                            "neq": "Is not equal to",
                            "gte": "Is greater than or equal to",
                            "gt": "Is greater than",
                            "lte": "Is less than or equal to",
                            "lt": "Is less than"
                        }
                    }
                });
        }
        if (kendo.spreadsheet.messages.menus) {
            kendo.spreadsheet.messages.menus =
                $.extend(true, kendo.spreadsheet.messages.menus, {
                    "cut": "Cut",
                    "copy": "Copy",
                    "paste": "Paste",
                    "merge": "Merge",
                    "unmerge": "Unmerge",
                    "delete": "Delete",
                    "hide": "Hide",
                    "unhide": "Unhide",
                    "bringToFront": "Bring to front",
                    "sendToBack": "Send to back"
                });
        }
        if (kendo.spreadsheet.messages.toolbar) {
            kendo.spreadsheet.messages.toolbar =
                $.extend(true, kendo.spreadsheet.messages.toolbar, {
                    "addColumnLeft": "Add column left",
                    "addColumnRight": "Add column right",
                    "addRowAbove": "Add row above",
                    "addRowBelow": "Add row below",
                    "alignment": "Alignment",
                    "alignmentButtons": {
                        "justtifyLeft": "Align left",
                        "justifyCenter": "Center",
                        "justifyRight": "Align right",
                        "justifyFull": "Justify",
                        "alignTop": "Align top",
                        "alignMiddle": "Align middle",
                        "alignBottom": "Align bottom"
                    },
                    "backgroundColor": "Background",
                    "bold": "Bold",
                    "borders": "Borders",
                    "copy": "Copy",
                    "cut": "Cut",
                    "deleteColumn": "Delete column",
                    "deleteRow": "Delete row",
                    "exportAs": "Export...",
                    "filter": "Filter",
                    "fontFamily": "Font",
                    "fontSize": "Font size",
                    "format": "Custom format...",
                    "formatDecreaseDecimal": "Decrease decimal",
                    "formatIncreaseDecimal": "Increase decimal",
                    "formatTypes": {
                        "automatic": "Automatic",
                        "text": "Text",
                        "number": "Number",
                        "percent": "Percent",
                        "financial": "Financial",
                        "currency": "Currency",
                        "date": "Date",
                        "time": "Time",
                        "dateTime": "Date time",
                        "duration": "Duration",
                        "moreFormats": "More formats..."
                    },
                    "freeze": "Freeze panes",
                    "freezeButtons": {
                        "freezePanes": "Freeze panes",
                        "freezeRows": "Freeze rows",
                        "freezeColumns": "Freeze columns",
                        "unfreeze": "Unfreeze panes"
                    },
                    "hyperlink": "Link",
                    "insertComment": "Insert comment",
                    "insertImage": "Insert image",
                    "italic": "Italic",
                    "merge": "Merge cells",
                    "mergeButtons": {
                        "mergeCells": "Merge all",
                        "mergeHorizontally": "Merge horizontally",
                        "mergeVertically": "Merge vertically",
                        "unmerge": "Unmerge"
                    },
                    "open": "Open...",
                    "paste": "Paste",
                    "quickAccess": {
                        "redo": "Redo",
                        "undo": "Undo"
                    },
                    "sort": "Sort",
                    "sortButtons": {
                        "sortRangeAsc": "Sort range A to Z",
                        "sortRangeDesc": "Sort range Z to A"
                    },
                    "textColor": "Text Color",
                    "textWrap": "Wrap text",
                    "toggleGridlines": "Toggle gridlines",
                    "underline": "Underline",
                    "validation": "Data validation..."
                });
        }
        if (kendo.spreadsheet.messages.view) {
            kendo.spreadsheet.messages.view =
                $.extend(true, kendo.spreadsheet.messages.view, {
                    "nameBox": "Name Box",
                    "errors": {
                        "openUnsupported": "Unsupported format. Please select an .xlsx file.",
                        "shiftingNonblankCells": "Cannot insert cells due to data loss possibility. Select another insert location or delete the data from the end of your worksheet.",
                        "insertColumnWhenRowIsSelected": "Cannot insert column when all columns are selected.",
                        "insertRowWhenColumnIsSelected": "Cannot insert row when all rows are selected.",
                        "filterRangeContainingMerges": "Cannot create a filter within a range containing merges",
                        "sortRangeContainingMerges": "Cannot sort a range containing merges",
                        "cantSortMultipleSelection": "Cannot sort multiple selection",
                        "cantSortNullRef": "Cannot sort empty selection",
                        "cantSortMixedCells": "Cannot sort range containing cells of mixed shapes",
                        "validationError": "The value that you entered violates the validation rules set on the cell.",
                        "cannotModifyDisabled": "Cannot modify disabled cells."
                    },
                    "tabs": {
                        "home": "Home",
                        "insert": "Insert",
                        "data": "Data"
                    }
                });
        }
        if (kendo.spreadsheet.messages.workbook) {
            kendo.spreadsheet.messages.workbook =
                $.extend(true, kendo.spreadsheet.messages.workbook, {
                    "defaultSheetName": "Sheet"
                });
        }
    }

    /* PivotGrid messages */
    if (kendo.ui.PivotGrid) {
        kendo.ui.PivotGrid.prototype.options.messages =
            $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
                "measureFields": "Drop Data Fields Here",
                "columnFields": "Drop Column Fields Here",
                "rowFields": "Drop Rows Fields Here"
            });
    }

    /* PivotConfigurator messages */
    if (kendo.ui.PivotConfigurator) {
        kendo.ui.PivotConfigurator.prototype.options.messages =
            $.extend(true, kendo.ui.PivotConfigurator.prototype.options.messages, {
                "measures": "Drop Data Fields Here",
                "columns": "Drop Column Fields Here",
                "rows": "Drop Rows Fields Here",
                "measuresLabel": "Measures",
                "columnsLabel": "Columns",
                "rowsLabel": "Rows",
                "fieldsLabel": "Fields"
            });
    }

    /* PivotFieldMenu messages */
    if (kendo.ui.PivotFieldMenu) {
        kendo.ui.PivotFieldMenu.prototype.options.messages =
            $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
                "info": "Show items with value that:",
                "sortAscending": "Sort Ascending",
                "sortDescending": "Sort Descending",
                "filterFields": "Fields Filter",
                "filter": "Filter",
                "include": "Include Fields...",
                "title": "Fields to include",
                "clear": "Clear",
                "ok": "OK",
                "cancel": "Cancel",
                "operators": {
                    "contains": "Contains",
                    "doesnotcontain": "Does not contain",
                    "startswith": "Starts with",
                    "endswith": "Ends with",
                    "eq": "Is equal to",
                    "neq": "Is not equal to"
                }
            });
    }

    /* PivotSettingTarget messages */
    if (kendo.ui.PivotSettingTarget) {
        kendo.ui.PivotSettingTarget.prototype.options.messages =
            $.extend(true, kendo.ui.PivotSettingTarget.prototype.options.messages, {
                "empty": "Drop Fields Here"
            });
    }

    /* TreeList messages */
    if (kendo.ui.TreeList) {
        kendo.ui.TreeList.prototype.options.messages =
            $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                "noRows": "No records to display",
                "loading": "Loading...",
                "requestFailed": "Request failed.",
                "retry": "Retry",
                "commands": {
                    "edit": "Edit",
                    "update": "Update",
                    "canceledit": "Cancel",
                    "create": "Add new record",
                    "createchild": "Add child record",
                    "destroy": "Delete",
                    "excel": "Export to Excel",
                    "pdf": "Export to PDF",
                    "save": "Save Changes",
                    "cancel": "Cancel Changes"
                }
            });
    }

    /* TreeListPager messages */
    if (kendo.ui.TreeListPager) {
        kendo.ui.TreeListPager.prototype.options.messages =
            $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
                "allPages": "All",
                "display": "{0} - {1} of {2} items",
                "empty": "No items to display",
                "page": "Page",
                "of": "of {0}",
                "itemsPerPage": "items per page",
                "first": "Go to the first page",
                "previous": "Go to the previous page",
                "next": "Go to the next page",
                "last": "Go to the last page",
                "refresh": "Refresh",
                "morePages": "More pages"
            });
    }

    /* List messages */
    if (kendo.ui.List) {
        kendo.ui.List.prototype.options.messages =
            $.extend(true, kendo.ui.List.prototype.options.messages, {
                "noData": "No data found.",
                "clear": "clear"
            });
        kendo.ui.List.prototype.options =
            $.extend(true, kendo.ui.List.prototype.options, {
                "noDataTemplate": "No data found."
            });
    }

    /* SelectBox messages */
    if (kendo.ui.SelectBox) {
        kendo.ui.SelectBox.prototype.options.messages =
            $.extend(true, kendo.ui.SelectBox.prototype.options.messages, {
                "noData": "No data found.",
                "clear": "clear"
            });
        kendo.ui.SelectBox.prototype.options =
            $.extend(true, kendo.ui.SelectBox.prototype.options, {
                "noDataTemplate": "No data found."
            });
    }

    /* AutoComplete messages */
    if (kendo.ui.AutoComplete) {
        kendo.ui.AutoComplete.prototype.options.messages =
            $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, {
                "noData": "No data found.",
                "clear": "clear"
            });
        kendo.ui.AutoComplete.prototype.options =
            $.extend(true, kendo.ui.AutoComplete.prototype.options, {
                "noDataTemplate": "No data found."
            });
    }

    /* ColorPicker messages */
    if (kendo.ui.ColorPicker) {
        kendo.ui.ColorPicker.prototype.options.messages =
            $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
                "apply": "Apply",
                "cancel": "Cancel",
                "noColor": "no color",
                "clearColor": "Clear color",
                "previewInput": "Color Hexadecimal Code"
            });
    }

    /* FlatColorPicker messages */
    if (kendo.ui.FlatColorPicker) {
        kendo.ui.FlatColorPicker.prototype.options.messages =
            $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
                "apply": "Apply",
                "cancel": "Cancel",
                "noColor": "no color",
                "clearColor": "Clear color",
                "previewInput": "Color Hexadecimal Code"
            });
    }

    /* ComboBox messages */
    if (kendo.ui.ComboBox) {
        kendo.ui.ComboBox.prototype.options.messages =
            $.extend(true, kendo.ui.ComboBox.prototype.options.messages, {
                "noData": "No data found.",
                "clear": "clear"
            });
        kendo.ui.ComboBox.prototype.options =
            $.extend(true, kendo.ui.ComboBox.prototype.options, {
                "noDataTemplate": "No data found."
            });
    }

    /* DateInput messages */
    if (kendo.ui.DateInput) {
        kendo.ui.DateInput.prototype.options.messages =
            $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
                "year": "year",
                "month": "month",
                "day": "day",
                "weekday": "day of the week",
                "hour": "hours",
                "minute": "minutes",
                "second": "seconds",
                "dayperiod": "AM/PM"
            });
    }

    /* DateRangePicker messages */
    if (kendo.ui.DateRangePicker) {
        kendo.ui.DateRangePicker.prototype.options.messages =
            $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
                "startLabel": "Start",
                "endLabel": "End"
            });
    }

    /* DropDownList messages */
    if (kendo.ui.DropDownList) {
        kendo.ui.DropDownList.prototype.options.messages =
            $.extend(true, kendo.ui.DropDownList.prototype.options.messages, {
                "noData": "No data found.",
                "clear": "clear"
            });
        kendo.ui.DropDownList.prototype.options =
            $.extend(true, kendo.ui.DropDownList.prototype.options, {
                "noDataTemplate": "No data found."
            });
    }

    /* DropDownTree messages */
    if (kendo.ui.DropDownTree) {
        kendo.ui.DropDownTree.prototype.options.messages =
            $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
                "noData": "No data found.",
                "clear": "clear",
                "deleteTag": "delete",
                "singleTag": "item(s) selected"
            });
        kendo.ui.DropDownTree.prototype.options =
            $.extend(true, kendo.ui.DropDownTree.prototype.options, {
                "noDataTemplate": "No data found.",
                "checkAllTemplate": "Check all"
            });
    }

    /* Editor messages */
    if (kendo.ui.Editor) {
        kendo.ui.Editor.prototype.options.messages =
            $.extend(true, kendo.ui.Editor.prototype.options.messages, {
                "bold": "Bold",
                "italic": "Italic",
                "underline": "Underline",
                "strikethrough": "Strikethrough",
                "superscript": "Superscript",
                "subscript": "Subscript",
                "justifyCenter": "Center text",
                "justifyLeft": "Align text left",
                "justifyRight": "Align text right",
                "justifyFull": "Justify",
                "insertUnorderedList": "Insert unordered list",
                "insertOrderedList": "Insert ordered list",
                "indent": "Indent",
                "outdent": "Outdent",
                "createLink": "Insert hyperlink",
                "unlink": "Remove hyperlink",
                "insertImage": "Insert image",
                "insertFile": "Insert file",
                "insertHtml": "Insert HTML",
                "viewHtml": "View HTML",
                "fontName": "Select font family",
                "fontNameInherit": "(inherited font)",
                "fontSize": "Select font size",
                "fontSizeInherit": "(inherited size)",
                "formatBlock": "Format",
                "formatting": "Format",
                "foreColor": "Color",
                "backColor": "Background color",
                "style": "Styles",
                "emptyFolder": "Empty Folder",
                "editAreaTitle": "Editable area. Press F10 for toolbar.",
                "uploadFile": "Upload",
                "overflowAnchor": "More tools",
                "orderBy": "Arrange by:",
                "orderBySize": "Size",
                "orderByName": "Name",
                "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
                "deleteFile": "Are you sure you want to delete \"{0}\"?",
                "overwriteFile": "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
                "directoryNotFound": "A directory with this name was not found.",
                "imageWebAddress": "Web address",
                "imageAltText": "Alternate text",
                "imageWidth": "Width (px)",
                "imageHeight": "Height (px)",
                "fileWebAddress": "Web address",
                "fileText": "Text",
                "fileTitle": "Title",
                "linkWebAddress": "Web address",
                "linkText": "Text",
                "linkToolTip": "ToolTip",
                "linkOpenInNewWindow": "Open link in new window",
                "dialogUpdate": "Update",
                "dialogInsert": "Insert",
                "dialogOk": "Ok",
                "dialogCancel": "Cancel",
                "cleanFormatting": "Clean formatting",
                "createTable": "Create a table",
                "createTableHint": "Create a {0} x {1} table",
                "addColumnLeft": "Add column on the left",
                "addColumnRight": "Add column on the right",
                "addRowAbove": "Add row above",
                "addRowBelow": "Add row below",
                "deleteRow": "Delete row",
                "deleteColumn": "Delete column",
                "mergeCellsHorizontally": "Merge cells horizontally",
                "mergeCellsVertically": "Merge cells vertically",
                "splitCellHorizontally": "Split cells horizontally",
                "splitCellVertically": "Split cells vertically",
                "tableWizard": "Table Wizard",
                "tableTab": "Table",
                "cellTab": "Cell",
                "accessibilityTab": "Accessibility",
                "caption": "Caption",
                "summary": "Summary",
                "width": "Width",
                "height": "Height",
                "units": "Units",
                "cellSpacing": "Cell Spacing",
                "cellPadding": "Cell Padding",
                "cellMargin": "Cell Margin",
                "alignment": "Alignment",
                "background": "Background",
                "cssClass": "CSS Class",
                "id": "ID",
                "border": "Border",
                "borderStyle": "Border Style",
                "collapseBorders": "Collapse borders",
                "wrapText": "Wrap text",
                "associateCellsWithHeaders": "Associate cells with headers",
                "alignLeft": "Align Left",
                "alignCenter": "Align Center",
                "alignRight": "Align Right",
                "alignLeftTop": "Align Left Top",
                "alignCenterTop": "Align Center Top",
                "alignRightTop": "Align Right Top",
                "alignLeftMiddle": "Align Left Middle",
                "alignCenterMiddle": "Align Center Middle",
                "alignRightMiddle": "Align Right Middle",
                "alignLeftBottom": "Align Left Bottom",
                "alignCenterBottom": "Align Center Bottom",
                "alignRightBottom": "Align Right Bottom",
                "alignRemove": "Remove Alignment",
                "columns": "Columns",
                "rows": "Rows",
                "selectAllCells": "Select All Cells",
                "exportAs": "Export As",
                "import": "Import",
                "print": "Print"
            });
        kendo.ui.Editor.defaultTools.pdf.options.template.options =
            $.extend(true, kendo.ui.Editor.defaultTools.pdf.options.template.options, {
                "title": "Export PDF"
            });
    }

    /* FileBrowser messages */
    if (kendo.ui.FileBrowser) {
        kendo.ui.FileBrowser.prototype.options.messages =
            $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
                "uploadFile": "Upload",
                "orderBy": "Arrange by",
                "orderByName": "Name",
                "orderBySize": "Size",
                "directoryNotFound": "A directory with this name was not found.",
                "emptyFolder": "Empty Folder",
                "deleteFile": "Are you sure you want to delete \"{0}\"?",
                "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
                "overwriteFile": "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
                "dropFilesHere": "drop file here to upload",
                "search": "Search"
            });
    }

    /* ImageBrowser messages */
    if (kendo.ui.ImageBrowser) {
        kendo.ui.ImageBrowser.prototype.options.messages =
            $.extend(true, kendo.ui.ImageBrowser.prototype.options.messages, {
                "uploadFile": "Upload",
                "orderBy": "Arrange by",
                "orderByName": "Name",
                "orderBySize": "Size",
                "directoryNotFound": "A directory with this name was not found.",
                "emptyFolder": "Empty Folder",
                "deleteFile": "Are you sure you want to delete \"{0}\"?",
                "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
                "overwriteFile": "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
                "dropFilesHere": "drop file here to upload",
                "search": "Search"
            });
    }

    /* ListBox messages */
    if (kendo.ui.ListBox) {
        kendo.ui.ListBox.prototype.options.messages =
            $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
                "tools": {
                    "remove": "Delete",
                    "moveUp": "Move Up",
                    "moveDown": "Move Down",
                    "transferTo": "Transfer To",
                    "transferFrom": "Transfer From",
                    "transferAllTo": "Transfer All To",
                    "transferAllFrom": "Transfer All From"
                }
            });
    }

    /* MultiColumnComboBox messages */
    if (kendo.ui.MultiColumnComboBox) {
        kendo.ui.MultiColumnComboBox.prototype.options.messages =
            $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, {
                "noData": "No data found.",
                "clear": "clear"
            });
        kendo.ui.MultiColumnComboBox.prototype.options =
            $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options, {
                "noDataTemplate": "No data found."
            });
    }

    /* MultiSelect messages */
    if (kendo.ui.MultiSelect) {
        kendo.ui.MultiSelect.prototype.options.messages =
            $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
                "noData": "No data found.",
                "clear": "clear",
                "deleteTag": "delete",
                "singleTag": "item(s) selected"
            });
        kendo.ui.MultiSelect.prototype.options =
            $.extend(true, kendo.ui.MultiSelect.prototype.options, {
                "noDataTemplate": "No data found."
            });
    }

    /* NumericTextBox options */
    if (kendo.ui.NumericTextBox) {
        kendo.ui.NumericTextBox.prototype.options =
            $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
                "upArrowText": "Increase value",
                "downArrowText": "Decrease value"
            });
    }

    /* Slider options */
    if (kendo.ui.Slider) {
        kendo.ui.Slider.prototype.options =
            $.extend(true, kendo.ui.Slider.prototype.options, {
                "increaseButtonTitle": "Increase",
                "decreaseButtonTitle": "Decrease",
                "dragHandleTitle": "drag"
            });
    }

    /* RangeSlider options */
    if (kendo.ui.RangeSlider) {
        kendo.ui.RangeSlider.prototype.options =
            $.extend(true, kendo.ui.RangeSlider.prototype.options, {
                "leftDragHandleTitle": "drag",
                "rightDragHandleTitle": "drag"
            });
    }

    /* Switch messages */
    if (kendo.ui.Switch) {
        kendo.ui.Switch.prototype.options.messages =
            $.extend(true, kendo.ui.Switch.prototype.options.messages, {
                "checked": "On",
                "unchecked": "Off"
            });
    }

    /* Upload localization */
    if (kendo.ui.Upload) {
        kendo.ui.Upload.prototype.options.localization =
            $.extend(true, kendo.ui.Upload.prototype.options.localization, {
                "select": "Select files...",
                "cancel": "Cancel",
                "retry": "Retry",
                "remove": "Remove",
                "pause": "Pause",
                "resume": "Resume",
                "clearSelectedFiles": "Clear",
                "uploadSelectedFiles": "Upload",
                "dropFilesHere": "Drop files here to upload",
                "invalidFiles": "Invalid file(s). Please check file upload requirements.",
                "statusUploading": "uploading",
                "statusUploaded": "uploaded",
                "statusWarning": "warning",
                "statusFailed": "failed",
                "headerStatusUploading": "Uploading...",
                "headerStatusPaused": "Paused",
                "headerStatusUploaded": "Done",
                "invalidMaxFileSize": "File size too large.",
                "invalidMinFileSize": "File size too small.",
                "invalidFileExtension": "File type not allowed."
            });
    }

    /* Validator messages */
    if (kendo.ui.Validator) {
        kendo.ui.Validator.prototype.options.messages =
            $.extend(true, kendo.ui.Validator.prototype.options.messages, {
                "required": "{0} is required",
                "pattern": "{0} is not valid",
                "min": "{0} should be greater than or equal to {1}",
                "max": "{0} should be smaller than or equal to {1}",
                "step": "{0} is not valid",
                "email": "{0} is not valid email",
                "url": "{0} is not valid URL",
                "date": "{0} is not valid date",
                "dateCompare": "End date should be greater than or equal to the start date"
            });
    }

    /* Chat messages */
    if (kendo.ui.Chat) {
        kendo.ui.Chat.prototype.options.messages =
            $.extend(true, kendo.ui.Chat.prototype.options.messages, {
                "placeholder": "Type a message..."
            });
    }

    if (kendo.chat.ChatView) {
        kendo.chat.ChatView.prototype.options.messages =
            $.extend(true, kendo.chat.ChatView.prototype.options.messages, {
                "isTyping": " is typing.",
                "areTyping": " are typing.",
                "and": " and "
            });
    }

    /* PDFViewer messages */
    if (kendo.ui.PDFViewer) {
        kendo.ui.PDFViewer.prototype.options.messages =
            $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
                "defaultFileName": "Document",
                "toolbar": {
                    "zoom": {
                        "zoomOut": "Zoom Out",
                        "zoomIn": "Zoom In",
                        "actualWidth": "Actual Width",
                        "autoWidth": "Automatic Width",
                        "fitToWidth": "Fit to Width",
                        "fitToPage": "Fit to Page"
                    },
                    "open": "Open",
                    "exportAs": "Export",
                    "download": "Download",
                    "pager": {
                        "first": "Go to the first page",
                        "previous": "Go to the previous page",
                        "next": "Go to the next page",
                        "last": "Go to the last page",
                        "of": " of {0} ",
                        "page": "page",
                        "pages": "pages"
                    },
                    "print": "Print",
                    "toggleSelection": "Enable Selection",
                    "togglePan": "Enable Panning",
                    "search": "Search"
                },
                "errorMessages": {
                    "notSupported": "Only pdf files allowed.",
                    "parseError": "PDF file fails to process.",
                    "notFound": "File is not found."
                },
                "dialogs": {
                    "exportAsDialog": {
                        "title": "Export...",
                        "defaultFileName": "Document",
                        "pdf": "Portable Document Format (.pdf)",
                        "png": "Portable Network Graphics (.png)",
                        "svg": "Scalable Vector Graphics (.svg)",
                        "labels": {
                            "fileName": "File name",
                            "saveAsType": "Save as",
                            "page": "Page"
                        }
                    },
                    "okText": "OK",
                    "save": "Save",
                    "cancel": "Cancel",
                    "search": {
                        "inputLabel": "Search Text",
                        "matchCase": "Match Case",
                        "next": "Next Match",
                        "previous": "Previous Match",
                        "close": "Close",
                        "of": "of"
                    }
                }
            });
    }

    /* Calendar messages */
    if (kendo.ui.Calendar) {
        kendo.ui.Calendar.prototype.options.messages =
            $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
                "weekColumnHeader": ""
            });
    }

    /* MultiViewCalendar messages */
    if (kendo.ui.MultiViewCalendar) {
        kendo.ui.MultiViewCalendar.prototype.options.messages =
            $.extend(true, kendo.ui.MultiViewCalendar.prototype.options.messages, {
                "weekColumnHeader": ""
            });
    }

    /* Gantt messages */
    if (kendo.ui.Gantt) {
        kendo.ui.Gantt.prototype.options.messages =
            $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
                "actions": {
                    "addChild": "Add Child",
                    "append": "Add Task",
                    "insertAfter": "Add Below",
                    "insertBefore": "Add Above",
                    "pdf": "Export to PDF"
                },
                "cancel": "Cancel",
                "deleteDependencyWindowTitle": "Delete dependency",
                "deleteDependencyConfirmation": "Are you sure you want to delete this dependency?",
                "deleteTaskWindowTitle": "Delete task",
                "deleteTaskConfirmation": "Are you sure you want to delete this task?",
                "destroy": "Delete",
                "editor": {
                    "assignButton": "Assign",
                    "editorTitle": "Task",
                    "end": "End",
                    "percentComplete": "Complete",
                    "resources": "Resources",
                    "resourcesEditorTitle": "Resources",
                    "resourcesHeader": "Resources",
                    "start": "Start",
                    "title": "Title",
                    "unitsHeader": "Units"
                },
                "save": "Save",
                "views": {
                    "day": "Day",
                    "end": "End",
                    "month": "Month",
                    "start": "Start",
                    "week": "Week",
                    "year": "Year"
                }
            });
    }

    /* GanttTimeline messages */
    if (kendo.ui.GanttTimeline) {
        kendo.ui.GanttTimeline.prototype.options.messages =
            $.extend(true, kendo.ui.GanttTimeline.prototype.options.messages, {
                "views": {
                    "day": "Day",
                    "week": "Week",
                    "month": "Month",
                    "year": "Year",
                    "start": "Start",
                    "end": "End"
                }
            });
    }

    /* Scheduler messages */
    if (kendo.ui.Scheduler) {
        kendo.ui.Scheduler.prototype.options.messages =
            $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
                "allDay": "all day",
                "date": "Date",
                "event": "Event",
                "time": "Time",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours",
                "today": "Today",
                "pdf": "Export to PDF",
                "save": "Save",
                "cancel": "Cancel",
                "destroy": "Delete",
                "resetSeries": "Reset Series",
                "deleteWindowTitle": "Delete event",
                "next": "Next",
                "previous": "Previous",
                "ariaSlotLabel": "Selected from {0:t} to {1:t}",
                "ariaEventLabel": "{0} on {1:D} at {2:t}",
                "editable": {
                    "confirmation": "Are you sure you want to delete this event?"
                },
                "views": {
                    "day": "Day",
                    "week": "Week",
                    "workWeek": "Work Week",
                    "agenda": "Agenda",
                    "month": "Month",
                    "timeline": "Timeline",
                    "timelineWeek": "Timeline Week",
                    "timelineWorkWeek": "Timeline Work Week",
                    "timelineMonth": "Timeline Month"
                },
                "recurrenceMessages": {
                    "deleteWindowTitle": "Delete Recurring Item",
                    "resetSeriesWindowTitle": "Reset Series",
                    "deleteWindowOccurrence": "Delete current occurrence",
                    "deleteWindowSeries": "Delete the series",
                    "deleteRecurringConfirmation": "Are you sure you want to delete this event occurrence?",
                    "deleteSeriesConfirmation": "Are you sure you want to delete the whole series?",
                    "editWindowTitle": "Edit Recurring Item",
                    "editWindowOccurrence": "Edit current occurrence",
                    "editWindowSeries": "Edit the series",
                    "deleteRecurring": "Do you want to delete only this event occurrence or the whole series?",
                    "editRecurring": "Do you want to edit only this event occurrence or the whole series?"
                },
                "editor": {
                    "title": "Title",
                    "start": "Start",
                    "end": "End",
                    "allDayEvent": "All day event",
                    "description": "Description",
                    "repeat": "Repeat",
                    "timezone": "Timezone",
                    "startTimezone": "Start timezone",
                    "endTimezone": "End timezone",
                    "separateTimezones": "Use separate start and end time zones",
                    "timezoneEditorTitle": "Timezones",
                    "timezoneEditorButton": "Time zone",
                    "timezoneTitle": "Time zones",
                    "noTimezone": "No timezone",
                    "editorTitle": "Event"
                }
            });
    }

    if (kendo.ui.DayView) {
        kendo.ui.DayView.prototype.options.messages =
            $.extend(true, kendo.ui.DayView.prototype.options.messages, {
                "allDay": "all day",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours"
            });
    }

    if (kendo.ui.MultiDayView) {
        kendo.ui.MultiDayView.prototype.options.messages =
            $.extend(true, kendo.ui.MultiDayView.prototype.options.messages, {
                "allDay": "all day",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours"
            });
    }

    if (kendo.ui.WeekView) {
        kendo.ui.WeekView.prototype.options.messages =
            $.extend(true, kendo.ui.WeekView.prototype.options.messages, {
                "allDay": "all day",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours"
            });
    }

    if (kendo.ui.WorkWeekView) {
        kendo.ui.WorkWeekView.prototype.options.messages =
            $.extend(true, kendo.ui.WorkWeekView.prototype.options.messages, {
                "allDay": "all day",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours"
            });
    }

    if (kendo.ui.AgendaView) {
        kendo.ui.AgendaView.prototype.options.messages =
            $.extend(true, kendo.ui.AgendaView.prototype.options.messages, {
                "event": "Event",
                "date": "Date",
                "time": "Time",
                "allDay": "all day"
            });
    }

    if (kendo.ui.TimelineView) {
        kendo.ui.TimelineView.prototype.options.messages =
            $.extend(true, kendo.ui.TimelineView.prototype.options.messages, {
                "defaultRowText": "All events",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours"
            });
    }

    if (kendo.ui.TimelineWeekView) {
        kendo.ui.TimelineWeekView.prototype.options.messages =
            $.extend(true, kendo.ui.TimelineWeekView.prototype.options.messages, {
                "defaultRowText": "All events",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours"
            });
    }

    if (kendo.ui.TimelineWorkWeekView) {
        kendo.ui.TimelineWorkWeekView.prototype.options.messages =
            $.extend(true, kendo.ui.TimelineWorkWeekView.prototype.options.messages, {
                "defaultRowText": "All events",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours"
            });
    }

    if (kendo.ui.TimelineMonthView) {
        kendo.ui.TimelineMonthView.prototype.options.messages =
            $.extend(true, kendo.ui.TimelineMonthView.prototype.options.messages, {
                "defaultRowText": "All events",
                "showFullDay": "Show full day",
                "showWorkDay": "Show business hours"
            });
    }

    /* RecurrenceEditor messages */
    if (kendo.ui.RecurrenceEditor) {
        kendo.ui.RecurrenceEditor.prototype.options.messages =
            $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                "recurrenceEditorTitle": "Recurrence editor",
                "frequencies": {
                    "never": "Never",
                    "hourly": "Hourly",
                    "daily": "Daily",
                    "weekly": "Weekly",
                    "monthly": "Monthly",
                    "yearly": "Yearly"
                },
                "hourly": {
                    "repeatEvery": "Repeat every: ",
                    "interval": " hour(s)"
                },
                "daily": {
                    "repeatEvery": "Repeat every: ",
                    "interval": " day(s)"
                },
                "weekly": {
                    "repeatEvery": "Repeat every: ",
                    "repeatOn": "Repeat on: ",
                    "interval": " week(s)"
                },
                "monthly": {
                    "repeatEvery": "Repeat every: ",
                    "repeatOn": "Repeat on: ",
                    "interval": " month(s)",
                    "day": "Day "
                },
                "yearly": {
                    "repeatEvery": "Repeat every: ",
                    "repeatOn": "Repeat on: ",
                    "interval": " year(s)",
                    "of": " of "
                },
                "end": {
                    "label": "End:",
                    "mobileLabel": "Ends",
                    "never": "Never",
                    "after": "After ",
                    "occurrence": " occurrence(s)",
                    "on": "On "
                },
                "offsetPositions": {
                    "first": "first",
                    "second": "second",
                    "third": "third",
                    "fourth": "fourth",
                    "last": "last"
                },
                "weekdays": {
                    "day": "day",
                    "weekday": "weekday",
                    "weekend": "weekend day"
                }
            });
    }

    /* MobileRecurrenceEditor messages */
    if (kendo.ui.MobileRecurrenceEditor) {
        kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
            $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
                "recurrenceEditorTitle": "Recurrence editor",
                "cancel": "Cancel",
                "update": "Save",
                "endTitle": "Repeat ends",
                "repeatTitle": "Repeat pattern",
                "headerTitle": "Repeat event",
                "frequencies": {
                    "never": "Never",
                    "hourly": "Hourly",
                    "daily": "Daily",
                    "weekly": "Weekly",
                    "monthly": "Monthly",
                    "yearly": "Yearly"
                },
                "hourly": {
                    "repeatEvery": "Repeat every: ",
                    "interval": ""
                },
                "daily": {
                    "repeatEvery": "Repeat every: ",
                    "interval": ""
                },
                "weekly": {
                    "repeatEvery": "Repeat every: ",
                    "repeatOn": "Repeat on: ",
                    "interval": ""
                },
                "monthly": {
                    "repeatBy": "Repeat by: ",
                    "repeatEvery": "Repeat every",
                    "repeatOn": "Repeat on: ",
                    "interval": "",
                    "dayOfMonth": "Day of the month",
                    "dayOfWeek": "Day of the week",
                    "every": "Every",
                    "day": "Day "
                },
                "yearly": {
                    "repeatBy": "Repeat by: ",
                    "repeatEvery": "Repeat every: ",
                    "repeatOn": "Repeat on: ",
                    "interval": "",
                    "dayOfMonth": "Day of the month",
                    "dayOfWeek": "Day of the week",
                    "every": "Every",
                    "month": "Month",
                    "day": "Day",
                    "of": " of "
                },
                "end": {
                    "patterns": {
                        "never": "Never",
                        "after": "After...",
                        "on": "On..."
                    },
                    "label": "End:",
                    "mobileLabel": "Ends",
                    "never": "Never",
                    "after": "End repeat after",
                    "occurrence": " occurrence(s)",
                    "on": "End repeat on"
                },
                "offsetPositions": {
                    "first": "first",
                    "second": "second",
                    "third": "third",
                    "fourth": "fourth",
                    "last": "last"
                },
                "weekdays": {
                    "day": "day",
                    "weekday": "weekday",
                    "weekend": "weekend day"
                }
            });
    }

    /* TimezoneEditor options */
    if (kendo.ui.TimezoneEditor) {
        kendo.ui.TimezoneEditor.prototype.options =
            $.extend(true, kendo.ui.TimezoneEditor.prototype.options, {
                "optionLabel": "No timezone"
            });
    }

    /* MobileTimezoneEditor options */
    if (kendo.ui.MobileTimezoneEditor) {
        kendo.ui.MobileTimezoneEditor.prototype.options =
            $.extend(true, kendo.ui.MobileTimezoneEditor.prototype.options, {
                "optionLabel": "No timezone"
            });
    }

    /* MediaPlayer messages */
    if (kendo.ui.MediaPlayer) {
        kendo.ui.MediaPlayer.prototype.options.messages =
            $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
                "pause": "Pause",
                "play": "Play",
                "mute": "Mute",
                "unmute": "Unmute",
                "quality": "Quality",
                "fullscreen": "Full Screen"
            });
    }

    /* Dialog messages */
    if (kendo.ui.Dialog) {
        kendo.ui.Dialog.prototype.options.messages =
            $.extend(true, kendo.ui.Dialog.prototype.options.messages, {
                "close": "Close"
            });
    }

    /* Alert messages */
    if (kendo.ui.Alert) {
        kendo.ui.Alert.prototype.options.messages =
            $.extend(true, kendo.ui.Alert.prototype.options.messages, {
                "okText": "OK",
                "cancel": "Cancel",
                "promptInput": "Input"
            });
    }

    /* Confirm messages */
    if (kendo.ui.Confirm) {
        kendo.ui.Confirm.prototype.options.messages =
            $.extend(true, kendo.ui.Confirm.prototype.options.messages, {
                "okText": "OK",
                "cancel": "Cancel",
                "promptInput": "Input"
            });
    }

    /* Prompt messages */
    if (kendo.ui.Prompt) {
        kendo.ui.Prompt.prototype.options.messages =
            $.extend(true, kendo.ui.Prompt.prototype.options.messages, {
                "okText": "OK",
                "cancel": "Cancel",
                "promptInput": "Input"
            });
    }

    /* PanelBar messages */
    if (kendo.ui.PanelBar) {
        kendo.ui.PanelBar.prototype.options.messages =
            $.extend(true, kendo.ui.PanelBar.prototype.options.messages, {
                "loading": "Loading...",
                "requestFailed": "Request failed.",
                "retry": "Retry"
            });
    }

    /* TreeView messages */
    if (kendo.ui.TreeView) {
        kendo.ui.TreeView.prototype.options.messages =
            $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
                "loading": "Loading...",
                "requestFailed": "Request failed.",
                "retry": "Retry"
            });
    }

    /* Progress messages */
    if (kendo.ui.progress) {
        kendo.ui.progress.messages =
            $.extend(true, kendo.ui.progress.messages, {
                "loading": "Loading..."
            });
    }

    /* VirtualList options */
    if (kendo.ui.VirtualList) {
        kendo.ui.VirtualList.prototype.options =
            $.extend(true, kendo.ui.VirtualList.prototype.options, {
                "placeholderTemplate": "loading..."
            });
    }

    /* Mobile Messages ------------------------------ */

    /* Mobile Loader options */
    if (kendo.mobile.ui.Loader) {
        kendo.mobile.ui.Loader.prototype.options =
            $.extend(true, kendo.mobile.ui.Loader.prototype.options, {
                "loading": "<h1>Loading...</h1>"
            });
    }

    /* Mobile Pane options */
    if (kendo.mobile.ui.Pane) {
        kendo.mobile.ui.Pane.prototype.options =
            $.extend(true, kendo.mobile.ui.Pane.prototype.options, {
                "loading": "<h1>Loading...</h1>"
            });
    }

    /* Mobile ListView messages */
    if (kendo.mobile.ui.ListView) {
        kendo.mobile.ui.ListView.prototype.options.messages =
            $.extend(true, kendo.mobile.ui.ListView.prototype.options.messages, {
                "loadMoreText": "Press to load more",
                "pullTemplate": "Pull to refresh",
                "releaseTemplate": "Release to refresh",
                "refreshTemplate": "Refreshing"
            });
    }

    /* Mobile Scroller messages */
    if (kendo.mobile.ui.Scroller) {
        kendo.mobile.ui.Scroller.prototype.options.messages =
            $.extend(true, kendo.mobile.ui.Scroller.prototype.options.messages, {
                "pullTemplate": "Pull to refresh",
                "releaseTemplate": "Release to refresh",
                "refreshTemplate": "Refreshing"
            });
    }

    /* Mobile Switch options */
    if (kendo.mobile.ui.Switch) {
        kendo.mobile.ui.Switch.prototype.options =
            $.extend(true, kendo.mobile.ui.Switch.prototype.options, {
                "onLabel": "on",
                "offLabel": "off"
            });
    }

})(window.kendo.jQuery);