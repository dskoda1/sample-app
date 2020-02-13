#!/usr/bin/env python

import sys
import csv
import argparse
import pathlib


parsers = {
    'boa': {
        'columns': {
            'date': 0,
            'payee': 2,
            'amount': 4,
        }
    },
    'capone': {
        'columns': {
            'date': 0,
            'payee': 3,
            'amount': 5,
        }
    },
    'chase': {
        'columns': {
            'date': 0,
            'payee': 2,
            'amount': 5,
        }
    }

}



if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('file', type=pathlib.Path)
    args = parser.parse_args()

    # Get the parser for this file
    matching_parsers = [bank for bank in parsers.keys() if bank in str(args.file).lower()]
    if not matching_parsers or len(matching_parsers) > 1:
        print(f"No parser found that matches file: {args.file}")
        sys.exit(1)

    parser = parsers[matching_parsers[0]]
    data = [line.strip().split(',') for line in args.file.open()]

    transactions = []
    with args.file.open(newline='') as csvfile:
        file_reader = csv.reader(csvfile, delimiter=',')
        next(file_reader)
        for row in file_reader:
            try:
                transactions.append({
                    'date': row[parser['columns']['date']],
                    'payee': row[parser['columns']['payee']],
                    'amount': abs(float(row[parser['columns']['amount']])),
                })
            except Exception as err:
                continue
                # TODO: Handle credits. capone includes credits, and those rows drop into here
                # due to being unable to convert empty string to float
                print(f"Failed to parse transaction: {row}, error: {err}")

